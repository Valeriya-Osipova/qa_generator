package org.example.patterns;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.WebDriverRunner.getWebDriver;
public class PagePrimitive {
    public static SelenideElement getElement(String xpath) {
        return $(By.xpath(xpath)).shouldBe(visible);
    }

    /**
     * Найти элемент с учетом ожидания. Таймаут в миллисекундах.
     *
     * @param xpath   путь к элементу
     * @param millis значение таймаута в миллисекундах
     * @return найденный элемент
     */
    public static SelenideElement getElement(String xpath, long millis) {
        return $(By.xpath(xpath)).shouldBe(visible, Duration.of(millis, ChronoUnit.MILLIS));
    }

    /**
     * Найти элемент от родительского узла, значение таймаута по умолчанию
     *
     * @param parent родитель
     * @param xpath  путь к элементу относительно родительского
     * @return найденный элемент
     */
    public static SelenideElement getElement(SelenideElement parent, String xpath) {
        return parent.find(By.xpath(xpath)).shouldBe(visible);
    }

    /**
     * Найти элемент от родительского узла с учетом ожидания. Таймаут в миллисекундах
     *
     * @param parent  родитель
     * @param xpath   путь к элементу относительно родительского
     * @param millis значение таймаута в миллисекундах
     * @return найденный элемент
     */
    public static SelenideElement getElement(SelenideElement parent, String xpath, long millis) {
        return parent.find(By.xpath(xpath)).shouldBe(visible, Duration.of(millis, ChronoUnit.MILLIS));
    }

    /**
     * скролинг элемента с учетом нескроллируемых областей сверху и "рабочему" размеру окна
     *
     * @param xpath        путь к элементу
     * @param topOffset    нескроллируемая область сверху
     * @param verticalSize размер окна
     * @return элемент соответствующий xpath
     */
    public static SelenideElement scrollElement(String xpath, int topOffset, int verticalSize) {
        return scrollElement(getElement(xpath), topOffset, verticalSize);
    }

    /**
     * скроллинг элемента
     *
     * @param xpath - путь к элементу
     * @return элемент соответствующий xpath
     */
    public static SelenideElement scrollElement(String xpath) {
        return scrollElement(getElement(xpath), 0, 0);
    }

    /**
     * Проверка на вхождение элемента в экран с учетом нескроллируемой области
     * сверху и ее размера
     *
     * @param el           проверяемый элемент
     * @param topOffset    нескроллируемая область сверху
     * @param verticalSize размер окна
     * @return true, если элемент в заданной области
     */
    public static boolean isElementScreen(SelenideElement el, int topOffset, int verticalSize) {
        int elY = el.getLocation().getY();
        // вычислим эффективную позицию скроллинга, с учетом нескроллируемого меню
        int effectiveScroll = getScrollTop() + topOffset;
        // вычислим эффективный размер экрана, за исключением нескроллируемого меню и размера окна
        // обычно элементы сильно внизу страницы, поэтому проверку выхода "вниз" поставим первой
        return elY < effectiveScroll + verticalSize && elY >= effectiveScroll;
    }


    /**
     * скроллинг элемента с учетом нескроллируемых областей сверху и "рабочему" размеру окна
     *
     * @param el           элемент
     * @param topOffset    нескроллируемая область сверху
     * @param verticalSize размер окна
     * @return элемент
     */
    public static SelenideElement scrollElement(SelenideElement el, int topOffset, int verticalSize) {
        if (!isElementScreen(el, topOffset, verticalSize)) {
            scrollTo(Math.max(0, el.getLocation().getY() - topOffset));
        }
        return el;
    }

    /**
     * скролинг элемента
     *
     * @param el - елемент
     * @return елемент
     */
    public static SelenideElement scrollElement(SelenideElement el) {
        return scrollElement(el, 0, 0);
    }

    /**
     * получить значение текущей прокрутки браузера
     *
     * @return - значение текущей прокрутки
     */

    public static int getScrollTop() {
        var jse = (JavascriptExecutor) getWebDriver();
        var result = jse.executeScript("return window.scrollY;");
        return result instanceof Long ? ((Long) result).intValue() : ((Double) result).intValue();
//        return ((Long) ((JavascriptExecutor) getWebDriver())
//                .executeScript("return window.pageYOffset || document.documentElement.scrollTop;")).intValue();
    }

    /**
     * выполнить скролирование в браузере на позицию y по вертикали
     *
     * @param y - значение для функции браузера window.scrollTo(0,y)
     */
    public static void scrollTo(int y) {
        int i = ((Long) ((JavascriptExecutor) getWebDriver())
                //.executeScript("window.scrollTo(0, " + y + "); return 1234;")).intValue();
                .executeScript("window.scrollTo(0, " + y + "); return 1234;")).intValue();
        if (i != 1234)
            throw new RuntimeException("Ошибка скролирования элемента на координату y = " + y);
    }

    /**
     * Клик по объекту
     *
     * @param el           - объект
     * @param topOffset    - смешение сверху страницы
     * @param verticalSize - вертикальный размер окна
     */
    public static void clickObject(SelenideElement el, int topOffset, int verticalSize) {
        // проверим элемент на существование
        if (!el.exists())
            return;
        scrollElement(el, topOffset, verticalSize);
        el.click();
    }

    /**
     * Клик по объекту
     *
     * @param el - объект
     */
    public static void clickObject(SelenideElement el) {
        clickObject(el, 0, 0);
    }

    /**
     * Клик по объекту
     *
     * @param xpath        - путь к элементу
     * @param topOffset    - смешение сверху страницы
     * @param verticalSize - вертикальный размер окна
     */
    public static void clickObject(String xpath, int topOffset, int verticalSize) {
        SelenideElement el = getElement(xpath);
        clickObject(el, topOffset, verticalSize);
    }

    /**
     * Клик по объекту
     *
     * @param xpath - путь к элементу
     */
    public static void clickObject(String xpath) {
        clickObject(xpath, 0, 0);
    }

    /**
     * Клик по объекту с учетом таймаута
     *
     * @param xpath        - путь к элементу
     * @param timeout      - таймаут
     * @param topOffset    - смешение сверху страницы
     * @param verticalSize - вертикальный размер окна
     */
    public static void clickObject(String xpath, long timeout, int topOffset, int verticalSize) {
        SelenideElement el = getElement(xpath, timeout);
        clickObject(el, topOffset, verticalSize);
    }

    /**
     * Клик по объекту с учетом таймаута
     *
     * @param xpath   - путь к элементу
     * @param timeout - таймаут
     */
    public static void clickObject(String xpath, long timeout) {
        clickObject(xpath, timeout, 0, 0);
    }

    /**
     * Клик по объекту
     *
     * @param parent       - родительский элемент
     * @param xpath        - путь к элементу относительно родительского
     * @param topOffset    - смешение сверху страницы
     * @param verticalSize - вертикальный размер окна
     */
    public static void clickObject(SelenideElement parent, String xpath, int topOffset, int verticalSize) {
        SelenideElement el = getElement(parent, xpath);
        clickObject(el, topOffset, verticalSize);
    }

    /**
     * Клик по объекту
     *
     * @param parent - родительский элемент
     * @param xpath  - путь к элементу относительно родительского
     */
    public static void clickObject(SelenideElement parent, String xpath) {
        clickObject(parent, xpath, 0, 0);
    }

}
