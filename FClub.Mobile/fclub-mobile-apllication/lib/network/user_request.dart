import 'dart:io';
import 'package:UniClub/main/constants.dart' as global;
import 'package:UniClub/model/user.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class UserRequest {
  static const String url =
      'https://club-management-service.azurewebsites.net/api/v1/users';

  // static Future<List<Club>> fetchClubs({int page = 1}) async {
  //   final response = await http.get(
  //     Uri.parse(url),
  //     headers: {
  //       HttpHeaders.authorizationHeader:
  //           await FirebaseAuth.instance.currentUser!.getIdToken()
  //     },
  //   );
  //   if (response.statusCode == 200) {
  //     return compute(parseClubs, response.body);
  //   } else if (response.statusCode == 404) {
  //     throw Exception("Not found.");
  //   } else if (response.statusCode == 401) {
  //     throw Exception("Unauthorized");
  //   } else {
  //     throw Exception("Can't get club");
  //   }
  // }

  static Future<Student>? fetchUserByEmail(String? email) async {
    var queryParameters = {'email': email};
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/users', queryParameters);
    final response = await http.get(
      uri,
      headers: {HttpHeaders.authorizationHeader: global.tokenauthor},
    );
    if (response.statusCode == 200) {
      print(response.body);
      return parseUser(response.body);
    } else if (response.statusCode == 404) {
      throw Exception("Not found.");
    } else if (response.statusCode == 401) {
      print(global.tokenauthor);
      throw Exception("Unauthorized");
    } else {
      throw Exception("Can't get club");
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

  // static List<Club> parseClubs(String responseBody) {
  //   var list = json.decode(responseBody) as List<dynamic>;
  //   List<Club> clubs = list.map((model) => Club.fromJson(model)).toList();
  //   return clubs;
  // }

  static Student parseUser(String responseBody) {
    var jsonResponse = json.decode(responseBody);
    Student user = Student.fromJson(jsonResponse);
    return user;
  }
}
