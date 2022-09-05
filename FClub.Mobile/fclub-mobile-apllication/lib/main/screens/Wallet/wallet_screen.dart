import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/News/components/news_card.dart';
import 'package:UniClub/main/screens/Wallet/components/wallet_card.dart';
import 'package:UniClub/model/member.dart';
import 'package:UniClub/model/user.dart';
import 'package:UniClub/network/member_request.dart';
import 'package:UniClub/network/news_request.dart';
import 'package:UniClub/network/user_request.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/painting.dart';
import 'package:UniClub/model/news.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class WalletScreen extends StatefulWidget {
  @override
  _WalletState createState() => _WalletState();
}

class _WalletState extends State<WalletScreen> {
  Student? user;
  Member? member;
  @override
  void initState() {
    // TODO: implement initState
    UserRequest.fetchUserByEmail(FirebaseAuth.instance.currentUser!.email)!
        .then((dataFromServer) {
      setState(() {
        user = dataFromServer;
      });
      MemberRequest.fetchMembersById(user?.data?.first.id)!
          .then((dataFromServer) {
        setState(() {
          member = dataFromServer;
        });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Padding(
        padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
        child: Column(children: [
          Text("Club Point Balance",
              textAlign: TextAlign.left,
              style: TextStyle(
                  color: Colors.amber[700],
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  decorationStyle: TextDecorationStyle.solid)),
          Expanded(
              child: ListView.separated(
            padding: EdgeInsets.all(20),
            itemCount: member?.data?.length ?? 0,
            itemBuilder: (context, index) {
              return WalletCard(
                  balance: member?.data?[index].wallets?.first.point ?? 0,
                  clubname: member?.data?[index].club?.name ?? "",
                  logo: member?.data?[index].club?.logo ?? "");
            },
            separatorBuilder: (BuildContext context, int index) =>
                const SizedBox(height: 20),
          ))
        ]));
  }
}
