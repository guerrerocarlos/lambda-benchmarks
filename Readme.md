## AWS Lambda Benchmarks

### AWS Lambda Experimental Performance Results (Dec 2024)

| RAM   | cpuCount | cpuSpeed | cpuModel                                      | pi (ms)   | fibonacci (ms) | integration (ms) | matrix (ms) | prime (ms) |
|-------|----------|----------|-----------------------------------------------|------|-----------|-------------|--------|-------|
| 256   | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 22130 | 11708     | 85480       | 128013 | 56331 |
| 512   | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 10634 | 6165      | 45881       | 66251  | 26562 |
| 768   | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 7339  | 3887      | 29744       | 42871  | 18862 |
| 1024  | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 5229  | 3094      | 22267       | 30497  | 13980 |
| 1280  | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 4143  | 2321      | 17794       | 24653  | 11256 |
| 1536  | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 3284  | 2051      | 14018       | 20585  | 9326  |
| 1792  | 2        | 2999     | Intel(R) Xeon(R) Processor @ 3.00GHz         | 2959  | 1771      | 12893       | 16819  | 7538  |
| 2048  | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2569  | 1530      | 12849       | 16213  | 8072  |
| 2304  | 2        | 3000     | Intel(R) Xeon(R) Processor @ 3.00GHz         | 2550  | 1805      | 12910       | 11932  | 6952  |
| 2560  | 2        | 3000     | Intel(R) Xeon(R) Processor @ 3.00GHz         | 2982  | 1773      | 11050       | 15845  | 6926  |
| 2816  | 2        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2959  | 1773      | 12882       | 17017  | 8049  |
| 3072  | 3        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2967  | 1525      | 13026       | 16529  | 8044  |
| 3328  | 3        | 2500     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2974  | 1782      | 11052       | 17319  | 8088  |
| 3584  | 3        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2966  | 1532      | 13105       | 17740  | 6925  |
| 3840  | 3        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2955  | 1795      | 12840       | 17979  | 8056  |
| 4096  | 3        | 2999     | Intel(R) Xeon(R) Processor @ 3.00GHz         | 2993  | 1808      | 11086       | 15943  | 6927  |
| 4352  | 3        | 2500     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2571  | 1523      | 11049       | 17720  | 6964  |
| 4608  | 3        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2986  | 1773      | 12935       | 16060  | 7003  |
| 4864  | 3        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2959  | 1791      | 11065       | 15899  | 8056  |
| 5120  | 3        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 3049  | 1530      | 12053       | 16490  | 8124  |
| 5376  | 4        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2591  | 1784      | 12915       | 16504  | 3392  |
| 5632  | 4        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2591  | 1771      | 12960       | 17493  | 6954  |
| 5888  | 4        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2585  | 1777      | 11113       | 17869  | 6934  |
| 6144  | 4        | 2999     | Intel(R) Xeon(R) Processor @ 3.00GHz         | 2552  | 1529      | 11235       | 17225  | 7007  |
| 6400  | 4        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2961  | 1537      | 12835       | 15229  | 8073  |
| 6656  | 4        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2961  | 1426      | 12848       | 16979  | 8165  |
| 6912  | 4        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2557  | 1529      | 12887       | 16456  | 6948  |
| 7168  | 5        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2567  | 1532      | 11039       | 18342  | 6960  |
| 7424  | 5        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2575  | 1529      | 11265       | 16916  | 8048  |
| 7680  | 5        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2981  | 1777      | 12839       | 17092  | 6960  |
| 7936  | 5        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2566  | 1771      | 12846       | 16620  | 8077  |
| 8192  | 5        | 2999     | Intel(R) Xeon(R) Processor @ 3.00GHz         | 2964  | 1776      | 11100       | 11738  | 7017  |
| 8448  | 5        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2961  | 1779      | 12816       | 17427  | 8051  |
| 8704  | 5        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2956  | 1528      | 12832       | 17376  | 8050  |
| 8960  | 6        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2553  | 1782      | 11063       | 16283  | 8047  |
| 9216  | 6        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2601  | 1772      | 12840       | 17371  | 8149  |
| 9472  | 6        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2959  | 1523      | 12865       | 17205  | 8067  |
| 9728  | 6        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2574  | 1765      | 11674       | 16628  | 8050  |
| 9984  | 6        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 2959  | 1530      | 12923       | 18122  | 6993  |
| 10240 | 6        | 2499     | Intel(R) Xeon(R) Processor @ 2.50GHz         | 3044  | 1772      | 12875       | 16291  | 8039  |

## Graphs:

  - [Multi-threaded Duration vs  RAM](https://gist.github.com/user-attachments/assets/66e0687f-bad9-4dff-9a81-734e62f9e98e.png)

  - [Single Threaded Duration VS RAM](https://gist.github.com/user-attachments/assets/7934b7ae-f99e-47f2-8705-520d07bcd05a.png)

  - [SingleThreaded-Cost and MultiThreaded-Cost](https://gist.github.com/user-attachments/assets/fdaf8db4-10f9-4d7b-a613-32ab24df434b.png)
