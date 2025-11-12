import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: join(__dirname, 'event-planner-capstone', '.env.local') });


AWS.config.update({
  region: process.env.VITE_AWS_REGION || 'us-east-1',
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();


const TABLE_NAME = 'Events';


async function createEventsTable() {
  const params = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: 'eventId', KeyType: 'HASH' } // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'eventId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST' 
  };

  try {
    console.log('Creating Events table...');
    await dynamodb.createTable(params).promise();
    console.log('✅ Table created successfully!');
    
    
    await dynamodb.waitFor('tableExists', { TableName: TABLE_NAME }).promise();
    console.log('✅ Table is now active and ready to use!');
  } catch (error) {
    if (error.code === 'ResourceInUseException') {
      console.log('ℹ️  Table already exists');
    } else {
      console.error('❌ Error creating table:', error.message);
      throw error;
    }
  }
}


async function addEvent(event) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      eventId: event.eventId || Date.now().toString(),
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      createdAt: new Date().toISOString()
    }
  };

  try {
    await docClient.put(params).promise();
    console.log('✅ Event added:', params.Item);
    return params.Item;
  } catch (error) {
    console.error('❌ Error adding event:', error);
    throw error;
  }
}


async function getAllEvents() {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await docClient.scan(params).promise();
    console.log('✅ Retrieved events:', data.Items);
    return data.Items;
  } catch (error) {
    console.error('❌ Error getting events:', error);
    throw error;
  }
}


async function deleteEvent(eventId) {
  const params = {
    TableName: TABLE_NAME,
    Key: { eventId }
  };

  try {
    await docClient.delete(params).promise();
    console.log('✅ Event deleted:', eventId);
  } catch (error) {
    console.error('❌ Error deleting event:', error);
    throw error;
  }
}


async function setup() {
  try {
    await createEventsTable();
    
    
    console.log('\nTesting with a sample event...');
    const sampleEvent = {
      name: 'Team Meeting',
      date: '2025-11-15',
      time: '10:00 AM',
      location: 'Conference Room A',
      description: 'Monthly team sync'
    };
    
    await addEvent(sampleEvent);
    await getAllEvents();
    
    console.log('\n✅ DynamoDB setup complete!');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}


export { addEvent, getAllEvents, deleteEvent, docClient, TABLE_NAME };


if (import.meta.url === `file://${process.argv[1]}`) {
  setup();
}
