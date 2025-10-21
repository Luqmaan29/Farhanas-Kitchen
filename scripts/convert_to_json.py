#!/usr/bin/env python3
"""
Cloud Kitchen Menu Converter
Converts text-based PDF menus to JSON format for the website
"""

import PyPDF2
import json
import re
import os
from typing import List, Dict

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from a PDF file - ALL PAGES"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            total_pages = len(pdf_reader.pages)
            print(f"  📄 Found {total_pages} pages in {pdf_path}")
            
            for page_num, page in enumerate(pdf_reader.pages, 1):
                page_text = page.extract_text()
                text += page_text + "\n"
                print(f"  📄 Processed page {page_num}/{total_pages}")
            
        return text
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
        return ""

def clean_price(price_text: str) -> int:
    """Clean price text and convert to integer"""
    # Remove currency symbols and extra spaces
    price_text = re.sub(r'[₹RsINR,\s]', '', price_text)
    
    # Extract only numbers
    numbers = re.findall(r'\d+', price_text)
    if numbers:
        return int(numbers[0])
    return 0

def parse_menu_items(text: str, category: str) -> List[Dict]:
    """Parse menu items from text - Enhanced for multi-page PDFs"""
    items = []
    lines = text.split('\n')
    item_id = 1
    
    print(f"  🔍 Parsing {len(lines)} lines for {category} items...")
    
    for line_num, line in enumerate(lines, 1):
        line = line.strip()
        if not line:
            continue
            
        # Look for pattern "Dish Name - Price" or "Dish Name Price"
        # Handle various separators: -, :, or just space
        price_patterns = [
            r'(.+?)\s*-\s*([₹RsINR\d,\s]+)$',  # Name - Price
            r'(.+?)\s*:\s*([₹RsINR\d,\s]+)$',   # Name : Price
            r'(.+?)\s+([₹RsINR\d,\s]+)$'        # Name Price
        ]
        
        for pattern in price_patterns:
            match = re.search(pattern, line)
            if match:
                dish_name = match.group(1).strip()
                price_text = match.group(2).strip()
                
                # Skip if dish name is too short or contains only numbers
                if len(dish_name) < 3 or dish_name.isdigit():
                    continue
                    
                # Skip common headers/footers and unwanted content
                skip_words = ['menu', 'price', 'veg', 'non', 'veg', 'total', 'subtotal', 'tax', 'phone', 'contact', 'address', 'page', 'page no', 'page no.', 'page number']
                if any(word in dish_name.lower() for word in skip_words):
                    continue
                
                # Skip phone numbers and contact info
                if re.match(r'^\d{10,}$', dish_name) or '|' in dish_name or '@' in dish_name:
                    continue
                
                # Skip page numbers and headers
                if re.match(r'^\d+$', dish_name) or dish_name.lower() in ['page', 'menu', 'price list']:
                    continue
                
                # Clean up dish name (remove extra spaces and weird characters)
                dish_name = re.sub(r'\s+', ' ', dish_name)  # Replace multiple spaces with single space
                dish_name = re.sub(r'[^\w\s\-&]', '', dish_name)  # Remove special chars except & and -
                dish_name = dish_name.strip()
                
                # Skip if name is still too short after cleaning
                if len(dish_name) < 3:
                    continue
                
                price = clean_price(price_text)
                if price > 0 and price < 10000:  # Only add items with reasonable prices
                    print(f"  ✅ Found: {dish_name} - ₹{price}")
                    items.append({
                        "id": item_id,
                        "name": dish_name,
                        "price": price,
                        "description": "",
                        "category": category,
                        "image": ""
                    })
                    item_id += 1
                break
    
    print(f"  📊 Total {category} items found: {len(items)}")
    return items

def main():
    """Main function to convert PDFs to JSON"""
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Define file paths
    veg_pdf = os.path.join(project_root, 'veg.pdf')
    nonveg_pdf = os.path.join(project_root, 'nonveg.pdf')
    output_json = os.path.join(project_root, 'frontend', 'src', 'data', 'menu.json')
    
    print("🍱 Cloud Kitchen Menu Converter")
    print("=" * 40)
    
    all_items = []
    item_id = 1
    
    # Process Veg menu
    if os.path.exists(veg_pdf):
        print(f"📄 Processing Veg menu: {veg_pdf}")
        veg_text = extract_text_from_pdf(veg_pdf)
        veg_items = parse_menu_items(veg_text, "Veg")
        # Update IDs to be sequential
        for item in veg_items:
            item['id'] = item_id
            item_id += 1
        all_items.extend(veg_items)
        print(f"✅ Found {len(veg_items)} veg items")
    else:
        print(f"❌ Veg PDF not found: {veg_pdf}")
    
    # Process Non-Veg menu
    if os.path.exists(nonveg_pdf):
        print(f"📄 Processing Non-Veg menu: {nonveg_pdf}")
        nonveg_text = extract_text_from_pdf(nonveg_pdf)
        nonveg_items = parse_menu_items(nonveg_text, "Non-Veg")
        # Update IDs to be sequential
        for item in nonveg_items:
            item['id'] = item_id
            item_id += 1
        all_items.extend(nonveg_items)
        print(f"✅ Found {len(nonveg_items)} non-veg items")
    else:
        print(f"❌ Non-Veg PDF not found: {nonveg_pdf}")
    
    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_json), exist_ok=True)
    
    # Save to JSON
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(all_items, f, indent=2, ensure_ascii=False)
    
    print(f"🎉 Successfully created menu.json with {len(all_items)} items")
    print(f"📁 Output saved to: {output_json}")
    
    # Display sample items
    if all_items:
        print("\n📋 Sample items:")
        for item in all_items[:3]:
            print(f"  • {item['name']} - ₹{item['price']} ({item['category']})")

if __name__ == "__main__":
    main()
