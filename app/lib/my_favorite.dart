import 'package:flutter/material.dart';

class FavouritesPage extends StatefulWidget {
  @override
  _FavouritesPageState createState() => _FavouritesPageState();
}

class _FavouritesPageState extends State<FavouritesPage> {
  List<Map<String, String>> _favouriteItems = [];

  void _removeFromFavourites(String name) {
    setState(() {
      _favouriteItems.removeWhere((item) => item['name'] == name);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Favourites'),
      ),
      body: ListView.builder(
        itemCount: _favouriteItems.length,
        itemBuilder: (context, index) {
          final item = _favouriteItems[index];
          return ListTile(
            leading: Image.asset(item['image']!),
            title: Text(item['name']!),
            trailing: IconButton(
              icon: Icon(Icons.favorite, color: Colors.red),
              onPressed: () => _removeFromFavourites(item['name']!),
            ),
          );
        },
      ),
    );
  }
}
