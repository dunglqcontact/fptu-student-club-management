import 'package:UniClub/model/university.dart';

class Member {
  List<Data>? data;
  Metadata? metadata;

  Member({this.data, this.metadata});

  Member.fromJson(Map<String, dynamic> json) {
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
  int? userId;
  String? clubId;
  int? roleId;
  bool? status;
  bool? isApproved;
  Club? club;
  // Null role;
  // Null user;
  // List<Null> NewsInfos;
  // List<Null> memberTasks;
  // List<Null> participants;
  // List<Null> tasks;
  List<Wallets>? wallets;

  Data(
      {this.id,
      this.userId,
      this.clubId,
      this.roleId,
      this.status,
      this.isApproved,
      this.club,
      // this.role,
      // this.user,
      // this.NewsInfos,
      // this.memberTasks,
      // this.participants,
      // this.tasks,
      this.wallets});

  Data.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userId'];
    clubId = json['clubId'];
    roleId = json['roleId'];
    status = json['status'];
    isApproved = json['isApproved'];
    club = json['club'] != null ? new Club.fromJson(json['club']) : null;
    // role = json['role'];
    // user = json['user'];
    // if (json['NewsInfos'] != null) {
    //   NewsInfos = new List<Null>();
    //   json['NewsInfos'].forEach((v) {
    //     NewsInfos.add(new Null.fromJson(v));
    //   });
    // }
    // if (json['memberTasks'] != null) {
    //   memberTasks = new List<Null>();
    //   json['memberTasks'].forEach((v) {
    //     memberTasks.add(new Null.fromJson(v));
    //   });
    // }
    // if (json['participants'] != null) {
    //   participants = new List<Null>();
    //   json['participants'].forEach((v) {
    //     participants.add(new Null.fromJson(v));
    //   });
    // }
    // if (json['tasks'] != null) {
    //   tasks = new List<Null>();
    //   json['tasks'].forEach((v) {
    //     tasks.add(new Null.fromJson(v));
    //   });
    // }
    if (json['wallets'] != null) {
      wallets = <Wallets>[];
      json['wallets'].forEach((v) {
        wallets?.add(new Wallets.fromJson(v));
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
    data['isApproved'] = this.isApproved;
    if (this.club != null) {
      data['club'] = this.club?.toJson();
    }
    // data['role'] = this.role;
    // data['user'] = this.user;
    // if (this.NewsInfos != null) {
    //   data['NewsInfos'] = this.NewsInfos.map((v) => v.toJson()).toList();
    // }
    // if (this.memberTasks != null) {
    //   data['memberTasks'] = this.memberTasks.map((v) => v.toJson()).toList();
    // }
    // if (this.participants != null) {
    //   data['participants'] = this.participants.map((v) => v.toJson()).toList();
    // }
    // if (this.tasks != null) {
    //   data['tasks'] = this.tasks.map((v) => v.toJson()).toList();
    // }
    if (this.wallets != null) {
      data['wallets'] = this.wallets?.map((v) => v.toJson()).toList();
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
  // University university;
  // List<Members> members;

  Club({
    this.id,
    this.universityId,
    this.name,
    this.balance,
    this.logo,
    // this.about,
    // this.university,
    // this.members
  });

  Club.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    universityId = json['universityId'];
    name = json['name'];
    balance = json['balance'];
    logo = json['logo'];
    // about = json['about'];
    // university = json['university'];
    // if (json['members'] != null) {
    //   members = new List<Members>();
    //   json['members'].forEach((v) {
    //     members.add(new Members.fromJson(v));
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
    // data['about'] = this.about;
    // data['university'] = this.university;
    // if (this.members != null) {
    //   data['members'] = this.members.map((v) => v.toJson()).toList();
    // }
    return data;
  }
}

class Wallets {
  int? id;
  int? memberId;
  double? point;
  // List<Null> transactionDetails;

  Wallets({this.id, this.memberId, this.point});

  Wallets.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    memberId = json['memberId'];
    point = json['point'];
    // if (json['transactionDetails'] != null) {
    //   transactionDetails = new List<Null>();
    //   json['transactionDetails'].forEach((v) {
    //     transactionDetails.add(new Null.fromJson(v));
    //   });
    // }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['memberId'] = this.memberId;
    data['point'] = this.point;
    // if (this.transactionDetails != null) {
    //   data['transactionDetails'] =
    //       this.transactionDetails.map((v) => v.toJson()).toList();
    // }
    return data;
  }
}

// class Members {
//   int id;
//   int userId;
//   String clubId;
//   int roleId;
//   Null status;
//   Null role;
//   Null user;
//   List<Null> NewsInfos;
//   List<Null> memberTasks;
//   List<Null> participants;
//   List<Null> tasks;
//   List<Null> wallets;

//   Members(
//       {this.id,
//       this.userId,
//       this.clubId,
//       this.roleId,
//       this.status,
//       this.role,
//       this.user,
//       this.NewsInfos,
//       this.memberTasks,
//       this.participants,
//       this.tasks,
//       this.wallets});

//   Members.fromJson(Map<String, dynamic> json) {
//     id = json['id'];
//     userId = json['userId'];
//     clubId = json['clubId'];
//     roleId = json['roleId'];
//     status = json['status'];
//     role = json['role'];
//     user = json['user'];
//     if (json['NewsInfos'] != null) {
//       NewsInfos = new List<Null>();
//       json['NewsInfos'].forEach((v) {
//         NewsInfos.add(new Null.fromJson(v));
//       });
//     }
//     if (json['memberTasks'] != null) {
//       memberTasks = new List<Null>();
//       json['memberTasks'].forEach((v) {
//         memberTasks.add(new Null.fromJson(v));
//       });
//     }
//     if (json['participants'] != null) {
//       participants = new List<Null>();
//       json['participants'].forEach((v) {
//         participants.add(new Null.fromJson(v));
//       });
//     }
//     if (json['tasks'] != null) {
//       tasks = new List<Null>();
//       json['tasks'].forEach((v) {
//         tasks.add(new Null.fromJson(v));
//       });
//     }
//     if (json['wallets'] != null) {
//       wallets = new List<Null>();
//       json['wallets'].forEach((v) {
//         wallets.add(new Null.fromJson(v));
//       });
//     }
//   }

//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['id'] = this.id;
//     data['userId'] = this.userId;
//     data['clubId'] = this.clubId;
//     data['roleId'] = this.roleId;
//     data['status'] = this.status;
//     data['role'] = this.role;
//     data['user'] = this.user;
//     if (this.NewsInfos != null) {
//       data['NewsInfos'] = this.NewsInfos.map((v) => v.toJson()).toList();
//     }
//     if (this.memberTasks != null) {
//       data['memberTasks'] = this.memberTasks.map((v) => v.toJson()).toList();
//     }
//     if (this.participants != null) {
//       data['participants'] = this.participants.map((v) => v.toJson()).toList();
//     }
//     if (this.tasks != null) {
//       data['tasks'] = this.tasks.map((v) => v.toJson()).toList();
//     }
//     if (this.wallets != null) {
//       data['wallets'] = this.wallets.map((v) => v.toJson()).toList();
//     }
//     return data;
//   }
// }

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
