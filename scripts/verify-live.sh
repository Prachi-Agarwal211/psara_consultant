#!/bin/bash
# Wait for server
for i in $(seq 1 25); do
  curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/ 2>/dev/null | grep -q 200 && break || sleep 1
done

echo "=== /faq schema: questions in FAQPage ==="
curl -s http://localhost:3001/faq | grep -o '"@type":"Question"' | wc -l
echo "=== /faq schema: FAQPage blocks ==="
curl -s http://localhost:3001/faq | grep -o '"@type":"FAQPage"' | wc -l
echo "=== home: FAQPage should be GONE from global graph ==="
curl -s http://localhost:3001/ | grep -o '"@type":"FAQPage"' | wc -l
echo "=== home: Organization still present ==="
curl -s http://localhost:3001/ | grep -o '"@type":"Organization"' | wc -l
echo "=== sitemap total ==="
curl -s http://localhost:3001/sitemap.xml | grep -c "<loc>"
echo "=== sitemap domain ==="
curl -s http://localhost:3001/sitemap.xml | grep -o "https://[^/]*" | sort -u
echo "=== blog post schema ==="
curl -s http://localhost:3001/blog/what-is-psara-license-complete-guide | grep -o '"@type":"BlogPosting"' | head -1
echo "=== state page schema sample ==="
curl -s http://localhost:3001/states/rajasthan | grep -o '"@type":"FAQPage"' | head -1
curl -s http://localhost:3001/states/rajasthan | grep -o '"@type":"HowTo"' | head -1
echo "=== city page schema sample ==="
curl -s http://localhost:3001/city/jaipur | grep -o '"@type":"FAQPage"' | head -1
