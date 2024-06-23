namespace AlienBot.Web
{
    using System;
    using System.Net;
    using System.Text;
    using AlienBot;
    using System.IO;
    using System.Threading.Tasks;

    public class Auth
    {
        static string CLIENT_ID = AlienBot.Primary.TWITCH_CLIENT_ID;
        static string CLIENT_SECRET = AlienBot.Primary.TWITCH_CLIENT_SECRET;
        static string REDIRECT_URI = AlienBot.Primary.TWITCH_REDIRECT_URI;
        public static string GetAccessToken(string code)
        {

            string url = "https://id.twitch.tv/oauth2/token";
            string postData = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + code + "&grant_type=authorization_code&redirect_uri=" + REDIRECT_URI;
            byte[] data = Encoding.ASCII.GetBytes(postData);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;
            using (Stream stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            string responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            return responseString;
        }
        public static string LoginPage(HttpListenerRequest request)
        {
            bool loggedIn = false;
            foreach (Cookie cookie in request.Cookies)
            {
                if (cookie.Name == "ab-loggedin" && cookie.Value == "true") // Assuming the cookie value is a string "true" when logged in
                {
                    loggedIn = true;
                    break; // Exit the loop once the logged-in cookie is found
                }
            }
            if (loggedIn)
            {
                // User is logged in, redirect to the home page
                return "Redirect: /dashboard";
            }
            else
            {
                // User is not logged in, show the login page
                return "Redirect: https://id.twitch.tv/oauth2/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=user:read:email";
            }
        }
    }
}