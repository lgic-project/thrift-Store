import 'package:app/homepage.dart';
import 'package:app/login.dart';
import 'package:app/navbar.dart';
import 'package:app/signin.dart';
import 'package:app/Purchase.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Thrift Store',
      initialRoute: '/',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(), 
      routes: {
        '/home': (context) => HomePage(),
        '/signup': (context) => SignInPage(),
        '/login': (context) => LoginPage(),
        '/navbar': (context) => const NavigatorScaffold(),
        '/logout': (context) => HomePage(),
        '/purchase': (context) => const Purchase(),
      },
    );
  }
}
