class Club {
  String? id;
  String? universityId;
  String? name;
  double? balance;
  String? logo;
  String? about;
  List<Members>? members;

  Club(
      {this.id,
      this.universityId,
      this.name,
      this.balance,
      this.logo,
      this.about,
      this.members});

  Club.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    universityId = json['universityId'];
    name = json['name'];
    balance = json['balance'];
    logo = json['logo'];
    about = json['about'];
    if (json['members'] != null) {
      members = <Members>[];
      json['members'].forEach((v) {
        members?.add(new Members.fromJson(v));
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
    if (this.members != null) {
      data['members'] = this.members?.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Members {
  int? id;
  int? userId;
  String? clubId;
  int? roleId;
  bool? status;
  List<EventInfos>? eventInfos;
  List<Tasks>? tasks;

  Members(
      {this.id,
      this.userId,
      this.clubId,
      this.roleId,
      this.status,
      this.eventInfos,
      this.tasks});

  Members.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    clubId = json['clubId'];
    roleId = json['roleId'];
    status = json['status'];
    if (json['eventInfos'] != null) {
      eventInfos = <EventInfos>[];
      json['eventInfos'].forEach((v) {
        eventInfos?.add(new EventInfos.fromJson(v));
      });
    }
    if (json['tasks'] != null) {
      tasks = <Tasks>[];
      json['tasks'].forEach((v) {
        tasks?.add(new Tasks.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['userId'] = this.userId;
    data['clubId'] = this.clubId;
    data['roleId'] = this.roleId;
    data['status'] = this.status;
    if (this.eventInfos != null) {
      data['eventInfos'] = this.eventInfos?.map((v) => v.toJson()).toList();
    }
    if (this.tasks != null) {
      data['tasks'] = this.tasks?.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class EventInfos {
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

  EventInfos(
      {this.id,
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
      this.status});

  EventInfos.fromJson(Map<String, dynamic> json) {
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
    return data;
  }
}

class Tasks {
  int? id;
  String? typeId;
  int? creatorId;
  double? awardPoint;
  double? pennaltyPoint;
  DateTime? createDate;
  DateTime? beginDate;
  DateTime? dueDate;
  String? title;
  String? content;
  int? limitJoin;
  bool? status;
  // List<Null> memberTasks;

  Tasks({
    this.id,
    this.typeId,
    this.creatorId,
    this.awardPoint,
    this.pennaltyPoint,
    this.createDate,
    this.beginDate,
    this.dueDate,
    this.title,
    this.content,
    this.limitJoin,
    this.status,
    // this.type,
    // this.memberTasks
  });

  Tasks.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    typeId = json['typeId'];
    creatorId = json['creatorId'];
    awardPoint = json['awardPoint'];
    pennaltyPoint = json['pennaltyPoint'];
    createDate = DateTime.parse(json['createDate'].toString());
    beginDate = DateTime.parse(json['beginDate'].toString());
    dueDate = DateTime.parse(json['dueDate'].toString());
    title = json['title'];
    content = json['content'];
    limitJoin = json['limitJoin'];
    status = json['status'];
    // type = json['type'];
    // if (json['memberTasks'] != null) {
    //   memberTasks = new List<Null>();
    //   json['memberTasks'].forEach((v) {
    //     memberTasks.add(new Null.fromJson(v));
    //   });
    // }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['typeId'] = this.typeId;
    data['creatorId'] = this.creatorId;
    data['awardPoint'] = this.awardPoint;
    data['pennaltyPoint'] = this.pennaltyPoint;
    data['createDate'] = this.createDate;
    data['beginDate'] = this.beginDate;
    data['dueDate'] = this.dueDate;
    data['title'] = this.title;
    data['content'] = this.content;
    data['limitJoin'] = this.limitJoin;
    data['status'] = this.status;
    // data['type'] = this.type;
    // if (this.memberTasks != null) {
    //   data['memberTasks'] = this.memberTasks.map((v) => v.toJson()).toList();
    // }
    return data;
  }
}
