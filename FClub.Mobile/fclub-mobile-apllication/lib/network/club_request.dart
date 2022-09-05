import 'dart:io';

import 'package:UniClub/main/constants.dart' as global;
import 'package:UniClub/model/approve.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:UniClub/model/club.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ClubRequest {
  static const String url =
      'https://club-management-service.azurewebsites.net/api/v1/clubs';

  static Future<List<Club>> fetchClubs({int page = 1}) async {
    String token = await FirebaseAuth.instance.currentUser!.getIdToken();
    print(token);
    final response = await http.get(
      Uri.parse(url),
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    if (response.statusCode == 200) {
      return parseClubs(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get club");
    }
  }

  static Future<List<Approve>> fetchSearchClub(String? name) async {
    var queryParameters = {
      'name': name,
    };
    var uri = Uri.https(
      'club-management-service.azurewebsites.net',
      '/api/v1/clubs',
      queryParameters,
    );
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      return parseApprove(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get club");
    }
  }

  static Future<Club> fetchClubsById(String? id) async {
    print(id);
    var queryParameters = {
      'id': id,
      'includeProperties': 'Members,Members.Tasks,Members.EventInfos'
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/clubs', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    if (response.statusCode == 200) {
      return parseClub(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get club");
    }
  }

  static Future<List<Approve>> fetchClubsWithApprove(int? id) async {
    var queryParameters = {
      'userId': id.toString(),
      'includeProperties': 'Members'
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/clubs/withapproved', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      return parseApprove(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get club");
    }
  }

  static Future<List<Approve>> fetchSearchClubsWithApprove(
      int? id, String? clubName) async {
    var queryParameters = {
      'userId': id.toString(),
      'name': clubName,
      'includeProperties': 'Members'
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/clubs/withapproved', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      return parseApprove(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get club");
    }
  }

  static List<Club> parseClubs(String responseBody) {
    var list = json.decode(responseBody) as List<dynamic>;
    List<Club> clubs = list.map((model) => Club.fromJson(model)).toList();
    return clubs;
  }

  static Club parseClub(String responseBody) {
    var list = json.decode(responseBody) as List<dynamic>;
    Club club = list.map((model) => Club.fromJson(model)).first;
    return club;
  }

  static List<Approve> parseApprove(String responseBody) {
    var list = json.decode(responseBody) as List<dynamic>;
    List<Approve> clubs = list.map((model) => Approve.fromJson(model)).toList();
    return clubs;
  }
}
