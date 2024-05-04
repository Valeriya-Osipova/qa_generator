package org.example.patterns;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParallelPattern {
    private WebDriver driver;

    @BeforeMethod
    @Parameters("browser")
    public void setUp(String browser) {
        // Инициализация драйвера в зависимости от указанного браузера
        switch (browser.toLowerCase()) {
            case "chrome":
                System.setProperty("webdriver.chrome.driver", "path/to/chromedriver.exe");
                driver = new ChromeDriver();
                break;
            case "firefox":
                System.setProperty("webdriver.gecko.driver", "path/to/geckodriver.exe");
                driver = new FirefoxDriver();
                break;
            case "ie":
                System.setProperty("webdriver.ie.driver", "path/to/IEDriverServer.exe");
                driver = new InternetExplorerDriver();
                break;
            default:
                throw new IllegalArgumentException("Unsupported browser: " + browser);
        }
        driver.manage().window().maximize();
    }

    @Test
    public void test1() {
        // Тестовый сценарий
        // driver.get("https://www.example.com");
        // Assert.assertEquals(driver.getTitle(), "Example Page");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
