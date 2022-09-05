import 'package:UniClub/model/member.dart';
import 'package:UniClub/model/university.dart';

class Student {
  List<Data>? data;
  Metadata? metadata;

  Student({this.data, this.metadata});

  Student.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = <Data>[];
      json['data'].forEach((v) {
        data?.add(new Data.fromJson(v));
      });
    }
    metadata = json['metadata'] != null
        ? new Metadata.fromJson(json['metadata'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.data != null) {
      data['data'] = this.data?.map((v) => v.toJson()).toList();
    }
    if (this.metadata != null) {
      data['metadata'] = this.metadata?.toJson();
    }
    return data;
  }
}

class Data {
  int? id;
  String? universityId;
  String? email;
  String? password;
  String? name;
  String? phone;
  DateTime? birthday;
  int? gender;
  String? photo;
  University? university;
  List<Member>? members;

  Data(
      {this.id,
      this.universityId,
      this.email,
      this.password,
      this.name,
      this.phone,
      this.birthday,
      this.gender,
      this.photo,
      this.university,
      this.members});

  Data.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    universityId = json['universityId'];
    email = json['email'];
    password = json['password'];
    name = json['name'];
    phone = json['phone'];
    birthday = DateTime.parse(json['birthday'].toString());
    gender = json['gender'];
    photo = json['photo'];
    university = json['university'];
    if (json['members'] != null) {
      members = <Member>[];
      json['members'].forEach((v) {
        members?.add(new Member.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['universityId'] = this.universityId;
    data['email'] = this.email;
    data['password'] = this.password;
    data['name'] = this.name;
    data['phone'] = this.phone;
    data['birthday'] = this.birthday;
    data['gender'] = this.gender;
    data['photo'] = this.photo;
    data['university'] = this.university;
    if (this.members != null) {
      data['members'] = this.members?.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Metadata {
  int? totalCount;
  int? pageSize;
  int? currentPage;
  int? totalPages;
  bool? hasNext;
  bool? hasPrevious;

  Metadata(
      {this.totalCount,
      this.pageSize,
      this.currentPage,
      this.totalPages,
      this.hasNext,
      this.hasPrevious});

  Metadata.fromJson(Map<String, dynamic> json) {
    totalCount = json['totalCount'];
    pageSize = json['pageSize'];
    currentPage = json['currentPage'];
    totalPages = json['totalPages'];
    hasNext = json['hasNext'];
    hasPrevious = json['hasPrevious'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['totalCount'] = this.totalCount;
    data['pageSize'] = this.pageSize;
    data['currentPage'] = this.currentPage;
    data['totalPages'] = this.totalPages;
    data['hasNext'] = this.hasNext;
    data['hasPrevious'] = this.hasPrevious;
    return data;
  }
}
