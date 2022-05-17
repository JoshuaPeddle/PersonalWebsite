import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType


# Chromedriver setup
chrome_service = Service(ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install())

chrome_options = Options()
options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-dev-shm-usage"
]
for option in options:
    chrome_options.add_argument(option)

driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
start_time = time.time()
print("# Start interacting with the website")
# Start interacting with the website
driver.get('https://notesapp.cloud')
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "current-password")
print("# Log in")
#Log in
username_input.send_keys("123")
password_input.send_keys("123")
password_input.send_keys(Keys.ENTER)

print("# Success")
print(time.time() - start_time)
driver.close()