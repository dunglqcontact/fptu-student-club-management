class News {
  List<Data>? data;
  Metadata? metadata;

  News({this.data, this.metadata});

  News.fromJson(Map<String, dynamic> json) {
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
  String? topic;
  String? content;
  int? creatorId;
  DateTime? createDate;
  bool? status;
  Creator? creator;

  Data(
      {this.id,
      this.topic,
      this.content,
      this.creatorId,
      this.createDate,
      this.status,
      this.creator});

  Data.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    topic = json['topic'];
    content = json['content'];
    creatorId = json['creatorId'];
    createDate = DateTime.parse(json['createDate'].toString());
    status = json['status'];
    creator =
        json['creator'] != null ? new Creator.fromJson(json['creator']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['topic'] = this.topic;
    data['content'] = this.content;
    data['creatorId'] = this.creatorId;
    data['createDate'] = this.createDate;
    data['status'] = this.status;
    if (this.creator != null) {
      data['creator'] = this.creator?.toJson();
    }
    return data;
  }
}

class Creator {
  int? id;
  int? userId;
  String? clubId;
  int? roleId;
  bool? status;
  Club? club;

  Creator(
      {this.id, this.userId, this.clubId, this.roleId, this.status, this.club});

  Creator.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    clubId = json['clubId'];
    roleId = json['roleId'];
    status = json['status'];
    club = json['club'] != null ? new Club.fromJson(json['club']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['userId'] = this.userId;
    data['clubId'] = this.clubId;
    data['roleId'] = this.roleId;
    data['status'] = this.status;
    if (this.club != null) {
      data['club'] = this.club?.toJson();
    }
    return data;
  }
}

class Club {
  String? id;
  String? universityId;
  String? name;
  double? balance;
  String? logo;
  String? about;
  // bool status;
  // Null university;
  // List<Null> members;

  Club({
    this.id,
    this.universityId,
    this.name,
    this.balance,
    this.logo,
    this.about,
    // this.status,
    // this.university,
    // this.members
  });

  Club.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    universityId = json['universityId'];
    name = json['name'];
    balance = json['balance'];
    logo = json['logo'];
    about = json['about'];
    // status = json['status'];
    // university = json['university'];
    // if (json['members'] != null) {
    //   members = new List<Null>();
    //   json['members'].forEach((v) {
    //     members.add(new Null.fromJson(v));
    //   });
    // }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['universityId'] = this.universityId;
    data['name'] = this.name;
    data['balance'] = this.balance;
    data['logo'] = this.logo;
    data['about'] = this.about;
    // data['status'] = this.status;
    // data['university'] = this.university;
    // if (this.members != null) {
    //   data['members'] = this.members.map((v) => v.toJson()).toList();
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
