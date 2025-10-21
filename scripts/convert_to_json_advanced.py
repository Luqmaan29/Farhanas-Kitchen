#!/usr/bin/env python3
"""
Advanced Cloud Kitchen Menu Converter
Handles multiple PDF pages and various menu formats
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

def parse_menu_items_advanced(text: str, category: str) -> List[Dict]:
    """Advanced parsing for various menu formats"""
    items = []
    lines = text.split('\n')
    item_id = 1
    
    print(f"  🔍 Parsing {len(lines)} lines for {category} items...")
    
    # Save raw text for debugging
    debug_file = f"debug_{category.lower().replace('-', '_')}.txt"
    with open(debug_file, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"  💾 Saved raw text to {debug_file} for debugging")
    
    for line_num, line in enumerate(lines, 1):
        line = line.strip()
        if not line:
            continue
        
        # Skip obvious non-menu items
        skip_patterns = [
            r'^\d+$',  # Just numbers
            r'^page\s*\d*$',  # Page numbers
            r'^menu$',  # Menu headers
            r'^price\s*list$',  # Price list headers
            r'^\d{10,}$',  # Phone numbers
            r'^contact',  # Contact info
            r'^address',  # Address info
        ]
        
        if any(re.match(pattern, line.lower()) for pattern in skip_patterns):
            continue
        
        # Try different price patterns
        price_patterns = [
            # Pattern: "Dish Name - ₹120" or "Dish Name - 120"
            r'(.+?)\s*-\s*([₹RsINR\d,\s]+)$',
            # Pattern: "Dish Name : ₹120" or "Dish Name : 120"
            r'(.+?)\s*:\s*([₹RsINR\d,\s]+)$',
            # Pattern: "Dish Name ₹120" or "Dish Name 120"
            r'(.+?)\s+([₹RsINR\d,\s]+)$',
            # Pattern: "₹120 Dish Name" (price first)
            r'([₹RsINR\d,\s]+)\s+(.+)$',
        ]
        
        for pattern in price_patterns:
            match = re.search(pattern, line)
            if match:
                if pattern.endswith('(.+)$'):  # Price first pattern
                    price_text = match.group(1).strip()
                    dish_name = match.group(2).strip()
                else:  # Name first pattern
                    dish_name = match.group(1).strip()
                    price_text = match.group(2).strip()
                
                # Clean dish name
                dish_name = re.sub(r'\s+', ' ', dish_name)
                dish_name = re.sub(r'[^\w\s\-&]', '', dish_name)
                dish_name = dish_name.strip()
                
                # Skip if too short or contains unwanted words
                if len(dish_name) < 3:
                    continue
                
                skip_words = ['menu', 'price', 'veg', 'non', 'total', 'subtotal', 'tax', 'phone', 'contact', 'address', 'page']
                if any(word in dish_name.lower() for word in skip_words):
                    continue
                
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
    
    print(f"  📊 Total {category} items found: {len(items)}")
    return items

def main():
    """Main function to convert PDFs to JSON"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    veg_pdf = os.path.join(project_root, 'veg.pdf')
    nonveg_pdf = os.path.join(project_root, 'nonveg.pdf')
    output_json = os.path.join(project_root, 'frontend', 'src', 'data', 'menu.json')
    
    print("🍱 Advanced Cloud Kitchen Menu Converter")
    print("=" * 50)
    
    all_items = []
    item_id = 1
    
    # Process Veg menu
    if os.path.exists(veg_pdf):
        print(f"📄 Processing Veg menu: {veg_pdf}")
        veg_text = extract_text_from_pdf(veg_pdf)
        veg_items = parse_menu_items_advanced(veg_text, "Veg")
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
        nonveg_items = parse_menu_items_advanced(nonveg_text, "Non-Veg")
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
        for item in all_items[:5]:
            print(f"  • {item['name']} - ₹{item['price']} ({item['category']})")
    
    print(f"\n💡 Debug files created:")
    print(f"  • debug_veg.txt - Raw veg menu text")
    print(f"  • debug_non_veg.txt - Raw non-veg menu text")
    print(f"  • Check these files to see what text was extracted")

if __name__ == "__main__":
    main()
