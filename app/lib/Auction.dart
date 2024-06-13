import 'package:flutter/material.dart';

class Auction extends StatefulWidget {
  const Auction({super.key});

  @override
  State<Auction> createState() => _AuctionState();
}

class _AuctionState extends State<Auction> {
  final List<Map<String, dynamic>> auctionItems = [
    {'image': 'assets/auction1.jpeg', 'title': 'Antique Vase', 'currentBid': 100.0},
    {'image': 'assets/auction2.jpeg', 'title': 'Vintage Watch', 'currentBid': 250.0},
    {'image': 'assets/auction3.jpeg', 'title': 'Classic Painting', 'currentBid': 500.0},
    // Add more auction items here
  ];

  void _placeBid(BuildContext context, String title) {
    showDialog(
      context: context,
      builder: (context) {
        double bidAmount = 0;
        return AlertDialog(
          title: Text('Place Bid on $title'),
          content: TextField(
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              hintText: 'Enter your bid amount',
            ),
            onChanged: (value) {
              bidAmount = double.parse(value);
            },
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                // Implement the logic to place a bid
                print('Bid placed: \$${bidAmount.toStringAsFixed(2)}');
                Navigator.of(context).pop();
              },
              child: const Text('Place Bid'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Auction Items'),
      ),
      body: ListView.builder(
        itemCount: auctionItems.length,
        itemBuilder: (context, index) {
          final item = auctionItems[index];
          return Card(
            margin: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Image.asset(item['Item1.jpeg']),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    item['Book'],
                    style: const TextStyle(
                      fontSize: 20.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Text(
                    'Current Bid: \$${item['currentBid'].toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontSize: 16.0,
                      color: Colors.green,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton(
                    onPressed: () {
                      _placeBid(context, item['Men']);
                    },
                    child: const Text('Place Bid'),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: Auction(),
  ));
}
