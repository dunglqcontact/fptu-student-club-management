import 'dart:convert';
import 'dart:io';

import 'package:UniClub/model/participant.dart';
import 'package:http/http.dart' as http;
import 'package:UniClub/main/constants.dart' as global;

class ParticipantRequest {
  static Future createParticipant(Participant part) async {
    var uri = Uri.https(
        'club-management-service.azurewebsites.net', '/api/v1/participants');
    final response = await http.post(uri,
        headers: {
          HttpHeaders.authorizationHeader: global.tokenauthor,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: jsonEncode(part.toJson()));
    if (response.statusCode == 200) {
      print("Register to event successful");
    } else {
      throw Exception("Failed to register event." + response.body);
    }
  }
}
