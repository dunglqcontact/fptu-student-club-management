import 'dart:io';

import 'package:UniClub/main/constants.dart' as global;
import 'package:UniClub/model/event.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class EventRequest {
  static const String url =
      'https://club-management-service.azurewebsites.net/api/v1/events';

  static Future<Event> fetchAvailableEvents() async {
    final response = await http.get(
      Uri.parse(url),
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      return parseEvents(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get event");
    }
  }

  static Future<Event> fetchAvailableEventsSortDate(
      String sort, String dir) async {
    var queryParameters = {
      'sort': sort,
      'dir': dir,
    };
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/events', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      return parseEvents(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get event");
    }
  }

  static Future<Event> fetchEventById(int? id) async {
    var queryParameters = {'id': id.toString()};
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/events', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      return parseEvents(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get event");
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

  static Event parseEvents(String responseBody) {
    var jsonResponse = json.decode(responseBody);
    Event event = Event.fromJson(jsonResponse);
    return event;
  }
}
