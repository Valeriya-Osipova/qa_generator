package org.example.tests;

import org.example.pages.LoginPage;
import org.example.patterns.RandomData;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class Test_1 {

    @BeforeClass
    public void beforeClass(){
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.example.com");
    }

/**
   Вызов всех тестовых методов
 */
    @Test(description = "тест 1")
    public void test(){
        test1();
        test2();
    }
    /**
     Иициализация рандомных значений
     */
    public void test1 () {
        String uniqueMail = RandomData.generateUniqueMail();
        System.out.println(uniqueMail);
    }

    public void test2 () {
        var item = new LoginPage();
        String ElementName = "example";
        item.makeAuthorise(ElementName);
    }

}
