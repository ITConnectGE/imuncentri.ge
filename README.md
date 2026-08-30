# imuncentri.ge

[imuncentri.ge](https://imuncentri.ge/) საიტის სტატიკური ასლი (WordPress + Elementor → static).
ქვეყნდება GitHub Pages-ზე `main` ბრენჩის root-იდან.

## გვერდები

| ბმული | გვერდი |
|---|---|
| `/` | მთავარი |
| `/about/` | ჩვენ შესახებ |
| `/services/` | სერვისები (`?popup=popup1..4` — სერვისის დეტალები) |
| `/blog/` | ბლოგი |
| `/contact/` | კონტაქტი |
| `/sample-page/` | WordPress-ის ნაგულისხმევი გვერდი |

`wp-content/` და `wp-includes/` — ორიგინალი თემის, Elementor-ის და ატვირთული მედიის ფაილები.

## ლოკალურად გაშვება

```bash
python -m http.server 8765 --bind 127.0.0.1
# http://127.0.0.1:8765/
```

## საიტის ხელახლა ჩამოტვირთვა

```bash
wget --mirror --page-requisites --convert-links \
     --no-host-directories --restrict-file-names=windows --no-parent --no-iri \
     --domains imuncentri.ge -e robots=off \
     --reject-regex '(/wp-json/|/feed/|/comments/|\?replytocom|xmlrpc)' \
     https://imuncentri.ge/
```

ჩამოტვირთვის შემდეგ საჭიროა:

1. `?ver=…` სუფიქსების მოშორება asset-ების სახელებიდან (თორემ Content-Type არასწორია და CSS/JS არ ჩაიტვირთება);
2. `?p=346|425|448` ბმულების ჩანაცვლება `about/`, `blog/`, `services/`-ით;
3. ქართულსახელიანი ფაილების ხელახლა ჩამოტვირთვა (wget-ი Windows-ზე მათ სახელებს აზიანებს).
