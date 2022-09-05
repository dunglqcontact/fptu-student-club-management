import 'dart:io';

import 'package:UniClub/main/constants.dart' as global;
import 'package:UniClub/model/member.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class MemberRequest {
  static const String url =
      'https://club-management-service.azurewebsites.net/api/v1/members';

  static Future<Member> fetchMembers() async {
    final response = await http.get(
      Uri.parse(url),
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    if (response.statusCode == 200) {
      return parseMember(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't members");
    }
  }

  static Future<Member>? fetchNewestMembers() async {
    var queryParameters = {
      'sort': 'Id',
      'dir': 'desc',
      'roleId': '2',
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/members', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    if (response.statusCode == 200) {
      return parseMember(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get member");
    }
  }

  static Future<Member>? fetchMembersById(int? id) async {
    var queryParameters = {
      'userId': id.toString(),
      'includeProperties': 'Club,Wallets'
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/members', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    if (response.statusCode == 200) {
      return parseMember(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get member");
    }
  }

  static Future createMember(Data data) async {
    var queryParameters = {'includeProperties': 'Club,Wallets'};
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/members', queryParameters);
    print(data.toJson());
    final response = await http.post(uri,
        headers: {
          HttpHeaders.authorizationHeader: global.tokenauthor,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: jsonEncode(data.toJson()));
    if (response.statusCode == 200) {
      print("join club successful");
    } else {
      throw Exception("Failed to join club." + response.body);
    }
  }
  // static Future<List<Post>> fetchClubs() async {
  //   var parsed = Uri.parse("https://jsonplaceholder.typicode.com/posts");
  //   final response = await http.get(parsed);

  //   if (response.statusCode == 200) {
  //     // If the server did return a 200 OK response,
  //     // then parse the JSON.
  //     return compute(parseClub, response.body);
  //   } else {
  //     // If the server did not return a 200 OK response,
  //     // then throw an exception.
  //     throw Exception('Failed to load album');
  //   }
  // }

  static Member parseMember(String responseBody) {
    var jsonResponse = json.decode(responseBody);
    Member member = Member.fromJson(jsonResponse);
    return member;
  }
}
