import 'package:flutter/material.dart';

class Product extends StatefulWidget {
  const Product({super.key});

  @override
  State<Product> createState() => _ProductState();
}

class _ProductState extends State<Product> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Product Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Image.network(
                'https://www.telegraph.co.uk/men/style/best-online-clothing-stores-for-men/', // Replace with actual product image URL
                height: 200,
                width: 200,
              ),
            ),
            SizedBox(height: 16.0),
            Text(
              'Men clothing', // Replace with actual product title
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8.0),
            Text(
              '\500.00', 
              style: TextStyle(fontSize: 20, color: Colors.green),
            ),
            SizedBox(height: 16.0),
            Text(
              'Soft clothes material, slik', // Replace with actual product description
              style: TextStyle(fontSize: 16),
            ),
            Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Add to cart functionality
                },
                child: Text('Add to Cart'),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 16.0),
                  textStyle: TextStyle(fontSize: 18),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
