import 'package:flutter/material.dart';

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo Home Page'),
      ),
      body: Center(
        child: Text(
          'Hello, world!',
          style: TextStyle(fontSize: 24.0),
        ),
      ),
    );
  }
}