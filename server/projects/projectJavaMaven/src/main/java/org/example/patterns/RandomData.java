package org.example.patterns;
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

