//home screen

//"connect to hubspot" button -> redirect to hubspot oauth
//user validates and confirms -> redirect to app landing page for hubspot oauth
//get authorization key from redirect
//store hubspot authorization key

//"connect to mailchimp" button -> redirect to hubspot oauth
//user validates and confirms -> redirect to app landing page for mailchimp oauth
//get authorization key from redirect
//store mailchimp authorization key

//management page

//"import from hubspot" button
////causes a full scan from hubspot to be performed
////update page with 'fetching from hubspot' notification
////fetch hubspot contacts
////read in contacts from db
////update page with 'comparing' notification
////merge hubspot contacts into db contacts
////update page with 'pushing to mailchimp' notification
////push new contacts to mailchimp

//"import automatically from hubspot" checkbox -> register event hook to hubspot

//hubspot event hook fired
////update page with 'fetching from hubspot' notification
////fetch hubspot contact by objectId (vid)
////read in contacts from db
////update page with 'comparing' notification
////add new hubspot contact into db contacts
////update page with 'pushing to mailchimp' notification
////push new contact to mailchimp