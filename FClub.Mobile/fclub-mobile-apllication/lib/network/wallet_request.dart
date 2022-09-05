import 'dart:io';

import 'package:UniClub/main/constants.dart' as global;

import 'package:UniClub/model/wallet.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class WalletRequest {
  static const String url =
      'https://club-management-service.azurewebsites.net/api/v1/wallets';

  static Future createWallet(Data data) async {
    var queryParameters = {'includeProperties': 'Member'};
    var uri = Uri.https('club-management-service.azurewebsites.net',
        '/api/v1/wallets', queryParameters);
    print(data.toJson());
    final response = await http.post(uri,
        headers: {
          HttpHeaders.authorizationHeader: global.tokenauthor,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: jsonEncode(data.toJson()));
    if (response.statusCode == 200) {
      print("create wallet successful");
    } else {
      throw Exception("Failed to create wallet." + response.body);
    }
  }

  static Future createWalletForNewMember(int id) async {
    Data create = Data(id: 0, memberId: id, point: 0);
    await createWallet(create);
  }
}
