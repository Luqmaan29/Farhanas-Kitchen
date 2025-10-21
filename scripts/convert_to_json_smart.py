#!/usr/bin/env python3
"""
Smart Cloud Kitchen Menu Converter
Handles the specific format found in your PDFs
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

def parse_menu_items_smart(text: str, category: str) -> List[Dict]:
    """Smart parsing for the specific menu format"""
    items = []
    lines = text.split('\n')
    item_id = 1
    
    print(f"  🔍 Parsing {len(lines)} lines for {category} items...")
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip empty lines and headers
        if not line or len(line) < 3:
            i += 1
            continue
        
        # Skip obvious headers/footers
        skip_patterns = [
            r'^\d+$',  # Just numbers
            r'^page\s*\d*$',  # Page numbers
            r'^menu$',  # Menu headers
            r'^price\s*list$',  # Price list headers
            r'^\d{10,}$',  # Phone numbers
            r'^contact',  # Contact info
            r'^address',  # Address info
            r'^authentic home made food',  # Common header
            r'^per plate',  # Common header
            r'^keep calm',  # Common header
            r'^start/refresh',  # Common header
            r'^with freshly',  # Common header
            r'^@\s*rs\.',  # Price headers
        ]
        
        if any(re.match(pattern, line.lower()) for pattern in skip_patterns):
            i += 1
            continue
        
        # Look for dish name followed by price on next line
        dish_name = line
        
        # Clean dish name
        dish_name = re.sub(r'\s+', ' ', dish_name)
        dish_name = re.sub(r'[^\w\s\-&]', '', dish_name)
        dish_name = dish_name.strip()
        
        # Skip if too short
        if len(dish_name) < 3:
            i += 1
            continue
        
        # Skip common headers
        skip_words = ['menu', 'price', 'veg', 'non', 'total', 'subtotal', 'tax', 'phone', 'contact', 'address', 'page', 'breakfast', 'tiffen', 'items', 'delights', 'biryani', 'chinese']
        if any(word in dish_name.lower() for word in skip_words):
            i += 1
            continue
        
        # Check if next line contains a price
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            price = clean_price(next_line)
            
            if price > 0 and price < 10000:
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
                i += 2  # Skip both lines
                continue
        
        # Also check if current line has price at the end
        price_patterns = [
            r'(.+?)\s+(\d+)$',  # Name followed by price
            r'(.+?)\s*-\s*(\d+)$',  # Name - price
            r'(.+?)\s*:\s*(\d+)$',  # Name : price
        ]
        
        for pattern in price_patterns:
            match = re.search(pattern, line)
            if match:
                dish_name = match.group(1).strip()
                price_text = match.group(2).strip()
                
                # Clean dish name
                dish_name = re.sub(r'\s+', ' ', dish_name)
                dish_name = re.sub(r'[^\w\s\-&]', '', dish_name)
                dish_name = dish_name.strip()
                
                if len(dish_name) < 3:
                    break
                
                price = clean_price(price_text)
                if price > 0 and price < 10000:
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
        
        i += 1
    
    print(f"  📊 Total {category} items found: {len(items)}")
    return items

def main():
    """Main function to convert PDFs to JSON"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    veg_pdf = os.path.join(project_root, 'veg.pdf')
    nonveg_pdf = os.path.join(project_root, 'nonveg.pdf')
    output_json = os.path.join(project_root, 'frontend', 'src', 'data', 'menu.json')
    
    print("🍱 Smart Cloud Kitchen Menu Converter")
    print("=" * 50)
    
    all_items = []
    item_id = 1
    
    # Process Veg menu
    if os.path.exists(veg_pdf):
        print(f"📄 Processing Veg menu: {veg_pdf}")
        veg_text = extract_text_from_pdf(veg_pdf)
        veg_items = parse_menu_items_smart(veg_text, "Veg")
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
        nonveg_items = parse_menu_items_smart(nonveg_text, "Non-Veg")
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
        for item in all_items[:10]:
            print(f"  • {item['name']} - ₹{item['price']} ({item['category']})")

if __name__ == "__main__":
    main()
