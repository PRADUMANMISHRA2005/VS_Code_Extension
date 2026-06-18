export const cppMain = `#include <bits/stdc++.h>
using namespace std;

using ll = long long;
using ld = long double;

#define fast ios::sync_with_stdio(false); cin.tie(nullptr);
#define all(x) (x).begin(), (x).end()
#define pb push_back
#define F first
#define S second

void solve() {

}

int main() {
    fast;

    // Uncomment for local testing
    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);

    int t = 1;
    // cin >> t;

    while (t--) {
        solve();
    }

    return 0;
}
`;

export const cppTemplate = cppMain;

export const javaMain = `import java.io.*;
import java.util.*;

public class Main {

    static FastScanner fs = new FastScanner();
    static PrintWriter out = new PrintWriter(System.out);

    static void solve() throws Exception {

    }

    public static void main(String[] args) throws Exception {

        // Uncomment for local testing
        // System.setIn(new FileInputStream("input.txt"));
        // System.setOut(new PrintStream("output.txt"));

        int t = 1;
        // t = fs.nextInt();

        while (t-- > 0) {
            solve();
        }

        out.flush();
    }

    static class FastScanner {
        BufferedReader br =
                new BufferedReader(
                        new InputStreamReader(System.in));

        StringTokenizer st;

        String next() throws Exception {
            while (st == null ||
                   !st.hasMoreElements()) {
                st = new StringTokenizer(
                        br.readLine());
            }
            return st.nextToken();
        }

        int nextInt() throws Exception {
            return Integer.parseInt(next());
        }

        long nextLong() throws Exception {
            return Long.parseLong(next());
        }

        double nextDouble() throws Exception {
            return Double.parseDouble(next());
        }
    }
}
`;

export const javaTemplate = `import java.io.*;
import java.util.*;

public class Template {

    static FastScanner fs = new FastScanner();
    static PrintWriter out = new PrintWriter(System.out);

    static void solve() throws Exception {

    }

    public static void main(String[] args) throws Exception {

        // Uncomment for local testing
        // System.setIn(new FileInputStream("input.txt"));
        // System.setOut(new PrintStream("output.txt"));

        int t = 1;
        // t = fs.nextInt();

        while (t-- > 0) {
            solve();
        }

        out.flush();
    }

    static class FastScanner {
        BufferedReader br =
                new BufferedReader(
                        new InputStreamReader(System.in));

        StringTokenizer st;

        String next() throws Exception {
            while (st == null ||
                   !st.hasMoreElements()) {
                st = new StringTokenizer(
                        br.readLine());
            }
            return st.nextToken();
        }

        int nextInt() throws Exception {
            return Integer.parseInt(next());
        }

        long nextLong() throws Exception {
            return Long.parseLong(next());
        }

        double nextDouble() throws Exception {
            return Double.parseDouble(next());
        }
    }
}
`;

