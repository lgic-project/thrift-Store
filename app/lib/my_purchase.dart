import 'package:flutter/material.dart';

class MyPurchasesPage extends StatefulWidget {
  @override
  _MyPurchasesPageState createState() => _MyPurchasesPageState();

  void addItemToPurchases(String title, String image, String price) {}
}

class _MyPurchasesPageState extends State<MyPurchasesPage> {
  List<Map<String, String>> _purchasedItems = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Purchases'),
      ),
      body: ListView.builder(
        itemCount: _purchasedItems.length,
        itemBuilder: (context, index) {
          final item = _purchasedItems[index];
          return ListTile(
            leading: Image.asset(item['image']!),
            title: Text(item['name']!),
            subtitle: Text(item['price']!),
          );
        },
      ),
    );
  }

  void addItemToPurchases(String name, String image, String price) {
    setState(() {
      _purchasedItems.add({
        'name': name,
        'image': image,
        'price': price,
      });
    });
  }
}
