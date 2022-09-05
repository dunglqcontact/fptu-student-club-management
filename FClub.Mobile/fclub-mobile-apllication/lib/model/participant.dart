class Participant {
  int? id;
  int? eventId;
  int? memberId;
  String? regisDate;
  int? bonusPoint;
  bool? attendance;
  double? rate;

  Participant(
      {this.id,
      this.eventId,
      this.memberId,
      this.regisDate,
      this.bonusPoint,
      this.attendance,
      this.rate});

  Participant.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    eventId = json['eventId'];
    memberId = json['memberId'];
    regisDate = json['regisDate'];
    bonusPoint = json['bonusPoint'];
    attendance = json['attendance'];
    rate = json['rate'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['eventId'] = this.eventId;
    data['memberId'] = this.memberId;
    data['regisDate'] = this.regisDate;
    data['bonusPoint'] = this.bonusPoint;
    data['attendance'] = this.attendance;
    data['rate'] = this.rate;
    return data;
  }
}
