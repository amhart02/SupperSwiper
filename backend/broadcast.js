import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ufspoqsiekltviqvfjlo.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Join a room/topic. Can be anything except for 'realtime'.
const channelA = supabase.channel('lobby_test')

// Simple function to log any messages we receive
function messageReceived(payload) {
    console.log(payload)
}

// Subscribe to the Channel
channelA
    .on(
        'broadcast',
        { event: 'test' },
        (payload) => messageReceived(payload)
    )
    .subscribe()

// Join a room/topic. Can be anything except for 'realtime'.
const channelB = supabase.channel('lobby_test')

channelB.subscribe((status) => {
    // Wait for successful connection
    if (status !== 'SUBSCRIBED') {
        return null
    }

    // Send a message once the client is subscribed
    channelB.send({
        type: 'broadcast',
        event: 'test',
        payload: { message: 'hello, world' },
    })
})
