using FirebaseAdmin.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Business.Service
{
    public class FCMService
    {
        public async void SendNoti(List<string> _registrationTokens, Dictionary<string, string> _data, string title, string body)
        {
            //var registrationToken = "csgoZF1BTLKWX8z1ldqGnn:APA91bG9aJAz88dH84X1bPGCMWWptdcPVZijpdjWyM-xUf8Kwtv7iA959xXE1k8UNZyYl6B5OPOtcRoscvagI8SZRblwWBtzxkEo3M-KUkslMez_vq36nggFYT1RWT9MWTSHyhVP9WIA";
            var registrationTokens = _registrationTokens;
            var message = new MulticastMessage()
            {
                Data = _data,
                Notification = new Notification
                {
                    Title = title,
                    Body = body
                },

                Tokens = registrationTokens,
                
                //Topic = "News"
            };
            var messaging = FirebaseMessaging.DefaultInstance;
            var result = await messaging.SendMulticastAsync(message);
            Console.WriteLine("Success send: " + result);
        }

    }
}
