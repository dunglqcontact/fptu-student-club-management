import 'package:UniClub/model/user.dart';

class Event {
  List<Data>? data;
  Metadata? metadata;

  Event({this.data, this.metadata});

  Event.fromJson(Map<String, dynamic> json) {
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
  int? creatorId;
  String? title;
  String? content;
  DateTime? createDate;
  DateTime? regisDate;
  DateTime? endRegisDate;
  DateTime? beginDate;
  DateTime? dueDate;
  double? bonusPoint;
  int? limitJoin;
  String? image;
  String? location;
  bool? status;
  Student? creator;
  // List<Null>? participants;

  Data({
    this.id,
    this.creatorId,
    this.title,
    this.content,
    this.createDate,
    this.regisDate,
    this.endRegisDate,
    this.beginDate,
    this.dueDate,
    this.bonusPoint,
    this.limitJoin,
    this.image,
    this.location,
    this.status,
    this.creator,
    // this.participants
  });

  Data.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    creatorId = json['creatorId'];
    title = json['title'];
    content = json['content'];
    createDate = DateTime.parse(json['createDate'].toString());
    regisDate = DateTime.parse(json['regisDate'].toString());
    endRegisDate = DateTime.parse(json['endRegisDate'].toString());
    beginDate = DateTime.parse(json['beginDate'].toString());
    dueDate = DateTime.parse(json['dueDate'].toString());
    bonusPoint = json['bonusPoint'];
    limitJoin = json['limitJoin'];
    image = json['image'];
    location = json['location'];
    status = json['status'];
    creator =
        json['creator'] != null ? new Student.fromJson(json['creator']) : null;
    // if (json['participants'] != null) {
    //   participants = <Null>[];
    //   json['participants'].forEach((v) {
    //     participants?.add(new Null.fromJson(v));
    //   });
    // }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['creatorId'] = this.creatorId;
    data['title'] = this.title;
    data['content'] = this.content;
    data['createDate'] = this.createDate;
    data['regisDate'] = this.regisDate;
    data['endRegisDate'] = this.endRegisDate;
    data['beginDate'] = this.beginDate;
    data['dueDate'] = this.dueDate;
    data['bonusPoint'] = this.bonusPoint;
    data['limitJoin'] = this.limitJoin;
    data['image'] = this.image;
    data['location'] = this.location;
    data['status'] = this.status;
    data['creator'] = this.creator;
    // if (this.participants != null) {
    //   data['participants'] = this.participants.map((v) => v.toJson()).toList();
    // }
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
