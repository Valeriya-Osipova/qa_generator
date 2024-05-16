const testngXml = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >
    
    <suite name="Tests">
        <test name="Тест первый">
            <classes>
                <class name="org.example.test"/>
            </classes>
        </test>
    </suite>`;

const pomStart = `
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>JavaMaven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
`;

const pomEnd = `
  </dependencies>

</project>
`;

const testngPom = `
      <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>7.8.0</version>
        </dependency>`;

const seleniumPom = `
      <dependency>
           <groupId>org.seleniumhq.selenium</groupId>
           <artifactId>selenium-java</artifactId>
           <version>4.16.1</version>
       </dependency>

       <dependency>
           <groupId>org.seleniumhq.selenium</groupId>
           <artifactId>selenium-chrome-driver</artifactId>
           <version>4.16.1</version>
       </dependency>`;

const selenidePom = `
    <dependency>
        <groupId>com.codeborne</groupId>
        <artifactId>selenide</artifactId>
        <version>7.2.2</version>
    </dependency>`;

const postgreSQLPom = `
    <dependency>
        <groupId>postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>9.1-901.jdbc4</version>
    </dependency>`;

const apachePoiPom = `
    <dependency>
      <groupId>org.apache.poi</groupId>
      <artifactId>poi</artifactId>
      <version>5.2.5</version>
    </dependency>`;

const apacheCommonsPom = `
    <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-lang3</artifactId>
      <version>3.14.0</version>
    </dependency>`;

const allurePom = `
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-testng</artifactId>
        <version>2.27.0</version>
    </dependency>`;

const jdbcTemplatePom = `
    <dependency>
      <groupId>com.jpattern</groupId>
      <artifactId>jporm-jdbctemplate</artifactId>
      <version>5.3.0</version>
    </dependency>`;

const PagePrimitiveData = `
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
`;
const ParallelPatternData = `package org.example.patterns;

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
`;
const RandomDataData = `package org.example.patterns;
import java.util.Random;
public class RandomData {
    private String[] phoneStart = {"8911", "8916", "8925", "8915"};
    private String[] names = {"Nick", "Name", "Ann", "Bob", "Jack", "Sarah", "Oliver", "Test"};
    private String[] symbol = {"!", "-", ")", "(", "&", "?", "_"};

    public static int generateUniqueNumber() {
        return new Random().nextInt(1000);
    }
    private String getRandomStart() {
        int i = new Random().nextInt(phoneStart.length);
        return phoneStart[i];
    }

    private String getRandomName() {
        int i = new Random().nextInt(names.length);
        return names[i];
    }

    private String getRandomSymbol() {
        int i = new Random().nextInt(symbol.length);
        return symbol[i];
    }
    public static String generateUniqueText() {
        return "Test" + new Random().nextInt(1000);
    }
    public static String generateUniqueMail() {
        String name = new RandomData().getRandomName();
        return name + new Random().nextInt(1000) + "@gmail.com";
    }
    public static String generateUniquePhone() {
        String start = new RandomData().getRandomStart();
        String end = "";
        for (int i = 0; i<7; i++){
            end += new Random().nextInt(10);
        }

        return start + end;
    }
    public static String generateUniquePass() {
        String symbol = new RandomData().getRandomSymbol();
        return "Pass" + symbol + new Random().nextInt(1000);
    }
}

`;

const testngParallelPattern = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >

<suite name="Tests">
    <test name="Тест первый">
        <classes>
            <class name="org.example.test"/>
        </classes>
    </test>


    <test name="Тест второй с параметром">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="org.example.patterns.ParallelPattern"/>
        </classes>
    </test>
</suite>`;

module.exports = {
  testngXml,
  pomStart,
  pomEnd,
  testngPom,
  seleniumPom,
  selenidePom,
  postgreSQLPom,
  apachePoiPom,
  apacheCommonsPom,
  allurePom,
  jdbcTemplatePom,
  PagePrimitiveData,
  ParallelPatternData,
  RandomDataData,
  testngParallelPattern,
};
