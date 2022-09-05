import 'package:UniClub/model/member.dart';

class Approve {
  Key? key;
  String? value;

  Approve({this.key, this.value});

  Approve.fromJson(Map<String, dynamic> json) {
    key = json['key'] != null ? new Key.fromJson(json['key']) : null;
    value = json['value'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.key != null) {
      data['key'] = this.key?.toJson();
    }
    data['value'] = this.value;
    return data;
  }
}

class Key {
  String? id;
  String? universityId;
  String? name;
  double? balance;
  String? logo;
  String? about;
  bool? status;
  // Null university;
  List<Member>? members;

  Key(
      {this.id,
      this.universityId,
      this.name,
      this.balance,
      this.logo,
      this.about,
      this.status,
      // this.university,
      this.members});

  Key.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    universityId = json['universityId'];
    name = json['name'];
    balance = json['balance'];
    logo = json['logo'];
    about = json['about'];
    status = json['status'];
    // university = json['university'];
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
    data['name'] = this.name;
    data['balance'] = this.balance;
    data['logo'] = this.logo;
    data['about'] = this.about;
    data['status'] = this.status;
    // data['university'] = this.university;
    if (this.members != null) {
      data['members'] = this.members?.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
