import 'dart:io';

import 'package:UniClub/main/constants.dart' as global;
import 'package:UniClub/model/news.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class NewsRequest {
  static const String url =
      'https://club-management-service.azurewebsites.net/api/v1/news';

  static Future<News> fetchNews() async {
    var queryParameters = {'includeProperties': 'Creator,Creator.Club'};
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/news', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    print(response.body);
    if (response.statusCode == 200) {
      print(parseNews(response.body).toJson());
      return parseNews(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get news");
    }
  }

  // static Future<News> fetchNewsById(int? id) async {
  //   var queryParameters = {'id': id.toString()};
  //   var uri = Uri.https('club-management-service.azurewebsites.net',
  //       '/api/v1/Newss', queryParameters);
  //   final response = await http.get(
  //     uri,
  //     headers: {HttpHeaders.authorizationHeader: tokenauthor},
  //   );
  //   print(response.body);
  //   if (response.statusCode == 200) {
  //     return parseNewss(response.body);
  //   } else if (response.statusCode == 404) {
  //     throw Exception("Not found.");
  //   } else if (response.statusCode == 401) {
  //     throw Exception("Unauthorized");
  //   } else {
  //     throw Exception("Can't get News");
  //   }
  // }
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

  static News parseNews(String responseBody) {
    var jsonResponse = json.decode(responseBody);
    News news = News.fromJson(jsonResponse);
    return news;
  }
}
