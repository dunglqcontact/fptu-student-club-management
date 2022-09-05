import 'package:UniClub/model/club.dart';
import 'package:UniClub/model/user.dart';

class University {
  List<Data>? data;

  University({this.data});

  University.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = <Data>[];
      json['data'].forEach((v) {
        data?.add(new Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.data != null) {
      data['data'] = this.data?.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Data {
  String? id;
  String? name;
  String? logo;
  String? address;
  List<Club>? clubs;
  List<Student>? userInfos;

  Data(
      {this.id,
      this.name,
      this.logo,
      this.address,
      this.clubs,
      this.userInfos});

  Data.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    logo = json['logo'];
    address = json['address'];
    if (json['clubs'] != null) {
      clubs = <Club>[];
      json['clubs'].forEach((v) {
        clubs?.add(new Club.fromJson(v));
      });
    }
    if (json['userInfos'] != null) {
      userInfos = <Student>[];
      json['userInfos'].forEach((v) {
        userInfos?.add(new Student.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['name'] = this.name;
    data['logo'] = this.logo;
    data['address'] = this.address;
    if (this.clubs != null) {
      data['clubs'] = this.clubs?.map((v) => v.toJson()).toList();
    }
    if (this.userInfos != null) {
      data['userInfos'] = this.userInfos?.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
