import requests, re
from multiprocessing import Process


def get_cat(cat_url):
    cat_file = cat_url.split("/")[-1]
    while True:
        cat_pull = requests.get(cat_url)
        with open(f"pics/{cat_file}", "wb") as f:
            f.write(cat_pull.content)
        if not cat_pull.text.startswith("<html>"):
            break

if __name__ == "__main__":
    for x in range(1,15):
        req = requests.get(f"https://yande.re/post.xml?tags=date:%3E2020-01-01%20nekomimi%20rating:safe%20order:score&page={x}").text
        cat_urls = re.findall("file_url=\"(.*?)\"",req)
        for cat_url in cat_urls:
            p = Process(target=get_cat, args=(cat_url,))
            p.start()
        p.join()