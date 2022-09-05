import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/News/components/news_card.dart';
import 'package:UniClub/network/news_request.dart';
import 'package:flutter/painting.dart';
import 'package:UniClub/model/news.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class NewsScreen extends StatefulWidget {
  @override
  _NewsState createState() => _NewsState();
}

class _NewsState extends State<NewsScreen> {
  List<Data>? data;
  String? logo;
  @override
  void initState() {
    // TODO: implement initState
    NewsRequest.fetchNews().then((dataFromServer) {
      setState(() {
        data = dataFromServer.data?.toList();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Padding(
        padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
        child: Column(children: [
          Text("Keep up with news !",
              textAlign: TextAlign.justify,
              style: TextStyle(
                  color: kPrimaryColor,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  decorationStyle: TextDecorationStyle.solid)),
          Expanded(
              child: ListView.separated(
            padding: EdgeInsets.all(20),
            itemCount: data?.length ?? 0,
            itemBuilder: (context, index) {
              return NewsCard(
                  logo: data?[index].creator?.club?.logo ?? "",
                  time: (DateFormat("h:mm - dd/MM/yyyy")
                      .format(data?[index].createDate ?? DateTime.now())),
                  content: data?[index].content ?? "null",
                  title: data?[index].topic ?? "null");
            },
            separatorBuilder: (BuildContext context, int index) =>
                const SizedBox(height: 20),
          ))
        ]));
  }
}
