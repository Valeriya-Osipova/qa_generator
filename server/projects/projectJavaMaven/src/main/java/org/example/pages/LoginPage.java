package org.example.pages;

import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;

import static com.codeborne.selenide.Selenide.$;
import static org.example.patterns.PagePrimitive.clickObject;
import static org.example.patterns.PagePrimitive.getElement;

public class LoginPage {

    private static int TIMEOUT = 10000;

    /** Инициализация элемента представляющего определенный раздел на странице */
    private final SelenideElement pageEl = $(By.xpath("//div"));

    /** Пример тетсового метода */
    public void makeAuthorise(String item){
        SelenideElement element = getElement(pageEl, String.format(".//*[text()='%s']", item), TIMEOUT);
        clickObject(element, 200, 0);
    }
}






