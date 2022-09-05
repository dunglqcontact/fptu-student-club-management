import 'package:flutter/cupertino.dart';

class Auth with ChangeNotifier {
  String? jwtToken;
  int? id;
  String? email;
  String? name;

  void setjwtToken(newvalue) {
    jwtToken = newvalue;
    notifyListeners();
  }

  Auth({this.jwtToken, this.id, this.email, this.name});

  Auth.fromJson(Map<String, dynamic> json) {
    jwtToken = json['jwtToken'];
    id = json['id'];
    email = json['email'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['jwtToken'] = this.jwtToken;
    data['id'] = this.id;
    data['email'] = this.email;
    data['name'] = this.name;
    return data;
  }
}
