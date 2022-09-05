import 'package:UniClub/main/components/rounded_button.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';
import 'package:flutter/painting.dart';

class WalletCard extends StatelessWidget {
  final String clubname;
  final double balance;
  final String logo;

  const WalletCard(
      {Key? key,
      required this.clubname,
      required this.balance,
      required this.logo})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return InkWell(
      child: Container(
        width: size.width,
        height: size.height * 0.3,
        decoration: BoxDecoration(
          border: Border.all(
            color: kPrimaryColor,
          ),
          color: kPrimaryColor,
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Container(
                width: size.width * 0.3,
                height: size.height * 0.1,
                decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: kPrimaryColor,
                    ),
                    color: kPrimaryColor,
                    image: new DecorationImage(
                      image: NetworkImage(logo),
                      fit: BoxFit.fitHeight,
                    ))),
            Container(
              padding: EdgeInsets.symmetric(vertical: 50.0),
              width: size.width * 0.47,
              decoration: BoxDecoration(
                  color: kSubColor2.withOpacity(0.7),
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(15.0),
                      bottomRight: Radius.circular(15.0))),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Text(clubname,
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black54)),
                  Text("Remaining Balance :",
                      style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.black45)),
                  Text(balance.toString() + " pts.",
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black45)),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
