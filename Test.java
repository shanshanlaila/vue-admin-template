import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Test {

  public static void main(String[] args) {

  }

  public int firstUniqChar(int n) {
    if (n < 1)
      return 0;
    int num = 0;
    int bs = 1;
    int round = n;
    while (round > 0) {
      int weight = round % 10;
      round /= 10;
      num += round * bs;
      if (weight == 1)
        num += (n % bs) + 1;
      else if (weight > 1)
        num += bs;
      bs *= 10;
    }
    return num;

  }
}
