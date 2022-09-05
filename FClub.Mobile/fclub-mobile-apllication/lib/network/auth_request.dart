import 'package:UniClub/main/constants.dart' as global;
import 'package:UniClub/model/auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthRequest {
  Future signIn(String? tokenId) async {
    String? deviceId = await FirebaseMessaging.instance.getToken();
    var queryParameters = {'IdToken': tokenId, 'deviceId': deviceId};
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/auths/sign-in', queryParameters);
    print("ggid: ${tokenId}");
    final response = await http.post(uri);
    global.tokenauthor = "Bearer " + parseAuth(response.body).jwtToken!;
    if (response.statusCode == 200) {
      print('sign in succesful!' + response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't sign in" + response.body);
    }
  }

  Future signUp(String? tokenId, String university, String username) async {
    var queryParameters = {
      'IdToken': tokenId,
      'universityId': university,
      'username': username
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/auths/sign-up', queryParameters);
    final response = await http.post(uri);
    if (response.statusCode == 200) {
      print('sign in succesful!');
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't sign in");
    }
  }

  static Auth parseAuth(String responseBody) {
    var res = json.decode(responseBody);
    Auth auth = Auth.fromJson(res);
    return auth;
  }
}
