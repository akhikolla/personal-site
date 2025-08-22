## JSON Parse

```
def get_value_with_wildcard(data, key_path):
    keys = key_path.lstrip('.').split('.')

    def helper(current_data, remaining_keys):
        if not remaining_keys:
            return [current_data]

        key = remaining_keys[0]
        rest = remaining_keys[1:]
        results = []

        # Easy case — direct key
        if key != '*':
            if isinstance(current_data, dict):
                if key in current_data:
                    return helper(current_data[key], rest)
                else:
            return []  # Key not found or not a dict

        # Wildcard case — '*' matches all keys at this level
        else:
            if isinstance(current_data, dict):
                for sub_key, sub_val in current_data.items():
                    results.extend(helper(sub_val, rest))

            return results

    final_results = helper(data, keys)

    if not final_results:
        return None
    elif len(final_results) == 1:
        return final_results[0]
    else:
        return final_results

```

### No with \*

```
def get_value_easy(data, key_path):

    keys = key_path.lstrip('.').split('.')
    current_data = data
    for key in keys:
        if isinstance(current_data, dict):
            if key in current_data:
                current_data = current_data[key]
            else:
                return None
        else:
            return None

    return current_data

```

## Valid Parentheses

> [link](https://leetcode.com/problems/valid-parentheses/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def isValid(self, s: str) -> bool:
        hmap = {
            ')' : '(',
            '}' : '{',
            ']' : '['
        }
        q = []
        for ch in s:
            if q and ch in hmap.keys() and q[-1] == hmap[ch]:
                q.pop()
            else:
                q.append(ch)
        return len(q) == 0
```

## Merge Sorted Array

> [link](https://leetcode.com/problems/merge-sorted-array/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        p1 = m-1
        p2 = n-1
        p = m + n - 1

        while p2 >= 0:
            if p1 >= 0 and nums1[p1] >= nums2[p2]:
                nums1[p] = nums1[p1]
                p1-=1
            else:
                nums1[p] = nums2[p2]
                p2-=1
            p-=1
```

## Merge Intervals

> [link](https://leetcode.com/problems/merge-intervals/description/)

```
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key = lambda i: i[0])
        merged_intervals = [intervals[0]]

        for start, end in intervals[1:]:
            prevEnd = merged_intervals[-1][1]
            if start <= prevEnd:
                merged_intervals[-1][1] = max(prevEnd, end)
            else:
                merged_intervals.append([start,end])

        return merged_intervals
```

## Best Time to Buy and Sell Stock

> [link](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        i = 0
        j = 0
        maxProfit = 0

        while j < len(prices):
            if prices[i] < prices[j]:
                maxProfit = max(maxProfit, prices[j] - prices[i])
            else:
                i = j
            j+=1

        return maxProfit
```

## Contains Duplicate

> [link](https://leetcode.com/problems/contains-duplicate/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # count_dict = {}
        # for num in nums:
        #     if num in count_dict:
        #         return True
        #     count_dict[num] = 1
        # return False

        return len(nums) > len(set(nums))
```

## Contains Duplicate II

> [link](https://leetcode.com/problems/contains-duplicate-ii/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        nums_count = {}

        for i in range(len(nums)):
            if nums[i] in nums_count:
                if(abs(nums_count[nums[i]] - i) <= k):
                    return True

            nums_count[nums[i]] = i

        return False

```

## Summary Ranges

> [link](https://leetcode.com/problems/summary-ranges/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        summary_ranges = []
        start = 0
        i = 0

        while i < len(nums):
            start = nums[i]

            while i + 1 < len(nums) and nums[i] + 1 == nums[i+1]:
                i+=1

            if start != nums[i]:
                summary_ranges.append(str(start) + '->' + str(nums[i]))
            else:
                summary_ranges.append(str(nums[i]))

            i+=1

        return summary_ranges
```

## Logger Rate Limiter

> [link](https://leetcode.com/problems/logger-rate-limiter/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Logger:

    def __init__(self):
        self.msg_dict = {}

    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        if message not in self.msg_dict:
            self.msg_dict[message] = timestamp
            return True

        if timestamp - self.msg_dict[message] >= 10:
            self.msg_dict[message] = timestamp
            return True
        else:
            return False


# Your Logger object will be instantiated and called as such:
# obj = Logger()
# param_1 = obj.shouldPrintMessage(timestamp,message)
```

## Time Based Key-Value Store

> [link](https://leetcode.com/problems/time-based-key-value-store/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class TimeMap:

    def __init__(self):
        self.timeMap = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.timeMap:
            self.timeMap[key] = []
        self.timeMap[key].append([value, timestamp])


    def get(self, key: str, timestamp: int) -> str:
        res = ""
        values = self.timeMap.get(key, [])
        l , r = 0, len(values) -1
        while l <= r:
            mid = (l + r) // 2
            if values[mid][1] <= timestamp:
                res = values[mid][0]
                l = mid + 1
            else:
                r = mid - 1
        return res


# Your TimeMap object will be instantiated and called as such:
# obj = TimeMap()
# obj.set(key,value,timestamp)
# param_2 = obj.get(key,timestamp)
```

## Longest Substring Without Repeating Characters

> [link](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        start = 0
        longest_substring = 0

        for r in range(len(s)):
            if s[r] in char_index and char_index[s[r]] >= start:
                start = char_index[s[r]] + 1
            else:
                longest_substring = max(longest_substring, r - start + 1)

            char_index[s[r]] = r

        return longest_substring

```

## Merge Intervals

> [link](https://leetcode.com/problems/merge-intervals/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key = lambda i: i[0])
        merged_intervals = [intervals[0]]

        for start, end in intervals[1:]:
            prevEnd = merged_intervals[-1][1]
            if start <= prevEnd:
                merged_intervals[-1][1] = max(prevEnd, end)
            else:
                merged_intervals.append([start,end])

        return merged_intervals
```

## LRU Cache

> [link](https://leetcode.com/problems/lru-cache/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class ListNode:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.hash_table = {}
        self.capacity = capacity
        self.head = ListNode()
        self.tail = ListNode()
        self.total_items = 0

        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        node = self.hash_table.get(key)
        if node is None:
            return -1

        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        node = self.hash_table.get(key)
        if node is None:
            new_node = ListNode(key, value)
            self.hash_table[key] = new_node
            self._add_to_head(new_node)
            self.total_items+=1

            if(self.total_items > self.capacity):
                self._remove_lru_entry()
        else:
            node.value = value
            self._move_to_head(node)

    def _remove_lru_entry(self):
        tail_item = self._pop_tail()
        del self.hash_table[tail_item.key]
        self.total_items-=1

    def _pop_tail(self) -> ListNode:
        lru_node = self.tail.prev
        self._remove_from_list(lru_node)
        return lru_node

    def _move_to_head(self, node: ListNode):
        self._remove_from_list(node)
        self._add_to_head(node)

    def _add_to_head(self, node: ListNode):
        node.prev = self.head
        node.next = self.head.next

        self.head.next.prev = node
        self.head.next = node

    def _remove_from_list(self, node: ListNode):
        saved_prev = node.prev
        saved_next = node.next

        saved_prev.next = saved_next
        saved_next.prev = saved_prev



# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
```

### Alternate approach

```
class ListNode:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev = self.next= None

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = {}
        self.capacity = capacity
        self.lru_ptr = self.mru_ptr = ListNode()

        self.lru_ptr.next = self.mru_ptr
        self.mru_ptr.prev = self.lru_ptr

    def remove(self, node):
        prev, next = node.prev, node.next
        prev.next, next.prev = next, prev

    def insert(self, node):
        prev, next = self.mru_ptr.prev, self.mru_ptr
        prev.next = next.prev = node
        node.prev, node.next = prev, next

    def get(self, key: int) -> int:
        if key in self.cache:
            self.remove(self.cache[key])
            self.insert(self.cache[key])
            return self.cache[key].value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.remove(self.cache[key])
        self.cache[key] = ListNode(key, value)
        self.insert(self.cache[key])

        if(len(self.cache) > self.capacity):
            lru = self.lru_ptr.next
            self.remove(lru)
            del self.cache[lru.key]





# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
```

## Word Search

> [link](https://leetcode.com/problems/word-search/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        visited = set()

        def dfs(row, col, i):
            if i == len(word):
                return True

            if(row < 0 or col < 0
            or row >= ROWS or col >= COLS
            or word[i] != board[row][col]
            or (row,col) in visited):
                return False

            visited.add((row,col))
            res = (dfs(row+1, col, i+1) or
                dfs(row-1, col, i+1) or
                dfs(row, col+1, i+1) or
                dfs(row, col-1, i+1))

            visited.remove((row,col))
            return res

        for r in range(ROWS):
            for c in range(COLS):
                if(dfs(r, c, 0)):
                    return True
        return False

```

## Insert Delete GetRandom O(1)

> [link](https://leetcode.com/problems/insert-delete-getrandom-o1/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class RandomizedSet:

    def __init__(self):
        self.nmap = {}
        self.nlist = []

    def insert(self, val: int) -> bool:
        res = val not in self.nmap
        if res:
            self.nmap[val] = len(self.nlist)
            self.nlist.append(val)
        return res

    def remove(self, val: int) -> bool:
        res = val in self.nmap
        if res:
            index = self.nmap[val]
            lastVal = self.nlist[-1]

            self.nlist[index] = lastVal
            self.nlist.pop()

            self.nmap[lastVal] = index
            del self.nmap[val]
        return res

    def getRandom(self) -> int:
       return random.choice(self.nlist)


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()
```

## Rotate Array

> [link](https://leetcode.com/problems/rotate-array/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        k = k % len(nums)
        start = 0
        end = len(nums) - 1

        def swapElements(l , r):
            while(l < r):
                temp = nums[l]
                nums[l] = nums[r]
                nums[r] = temp
                l+=1
                r-=1

        swapElements(start, end)
        swapElements(start, k-1)
        swapElements(k, end)
```

## Coin Change

> [link](https://leetcode.com/problems/coin-change/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0

        for a in range(1, amount+1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1+dp[a-c])

        return dp[amount] if dp[amount] != amount + 1 else -1

```

## Top K Frequent Elements

> [link](https://leetcode.com/problems/top-k-frequent-elements/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count_elements = {}

        for num in nums:
            count_elements[num] = count_elements.get(num, 0) + 1

        freq = [[] for _ in range(len(nums) + 1)]
        for num, c in count_elements.items():
            freq[c].append(num)

        result = []
        for i in range(len(freq)-1, 0, -1):
            result.extend(freq[i])
            if len(result) >= k:
                return result[:k]
```

## Top K Frequent Words

> [link](https://leetcode.com/problems/top-k-frequent-words/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        most_frequent_words = {}

        for s in words:
            most_frequent_words[s] = most_frequent_words.get(s, 0) + 1

        freq = [[] for _ in range(len(words) + 1)]

        for s, c in most_frequent_words.items():
            freq[c].append(s)
            freq[c].sort()

        result = []
        for f in range(len(freq)-1, 0, -1):
            result.extend(freq[f])
            if(len(result) >= k):
                return result[:k]
```

## Daily Temperatures

> [link](https://leetcode.com/problems/daily-temperatures/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def dailyTemperatures(self, l: List[int]) -> List[int]:
        stack = []
        nextGreaterTemparatures = [0] * len(l)

        for i in range(len(l)):
            while stack and l[stack[-1]] < l[i]:
                nextGreaterTemparatures[stack[-1]] = i - stack[-1]
                stack.pop()

            stack.append(i)
        return nextGreaterTemparatures
```

## Generate Parentheses

> [link](https://leetcode.com/problems/generate-parentheses/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        valid_parentheses = []

        def generateParenthesis(open_count, close_count, cur):
            if len(cur) == 2*n:
                valid_parentheses.append(cur)
                return cur

            if open_count < n:
                generateParenthesis(open_count+1, close_count, cur + '(')

            if close_count < open_count :
                generateParenthesis(open_count, close_count + 1, cur + ')')

        generateParenthesis(0,0, '')
        return valid_parentheses
```

## Implement Queue using Stacks

> [link](https://leetcode.com/problems/implement-queue-using-stacks/description/?envType=company&envId=netflix&favoriteSlug=netflix-all)

```
class MyQueue:

    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        self.s1.append(x)


    def pop(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2.pop()


    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        return max(len(self.s1), len(self.s2)) == 0



# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
```

### Python Syntax:

#### Lists

```
arr = []
arr = list()

arr.append(x)
arr.pop()
arr.pop(i)
arr.insert(i, x)
arr.remove(x)
x in arr

arr.sort() #In place sort, O(nlogn)
sorted(arr) #returns sorted list O(nlogn)
arr.reverse() # In place reverse
```

#### Dictionary(HashMap)

```
d = {}
d = dict()

d[key] = value
d.get(key, default) # get with default if the key is missing, O(1)
del d[key] # delete key value pair
key in d
d.keys() # get keys view
d.values() # get values view
d.items()  # get key value pairs view
d.pop(key) # remove and return the value
```

#### Set(HashSet)

```
s = set()
s = {1,2,3}

s.add(x)
s.remove(x)
s.discard(x)
x in s
s1 | s2 # Union
s1 & s2 # Intersection
s1 - s2 # difference
```

#### Queue

```
from collections import deque

q = deque()

q.append(x) // add to right
q.appendLeft(x) // add to left
q.pop() // pops right element
q.popLeft() // pops left element
```

#### Stack

```
stack = []
stack.append(x)
stack.pop()
stack[-1] // peeks top element in stack
```

#### Heap

```
import heapq

heap = []
heapq.heapify(list) // converts list to heap

heapq.heappush(heap, x) // add element O(log n)
heapq.heappop(heap) // remove and return smallest O(log n)
heap[0] // peek smallest O(1)
heapq.nlargest(k, heap) # Get k largest elements O(nlogk)
heapq.nsmallest(k, heap) # Get k smallest elements O(nlogk)

// for max queue negate values when pushing or popping

```

#### LinkedList

```
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = ListNode(1)
head.next = ListNode(2)
temp = head.next
head.next = temp.next
```

#### Tree

```
class TreeNode:
    def __init(self, val=0, left=None, right=None):
        self.val = val
        self.right = right
        self.left = left

// Binary search tree operations average O(logn), worst O(n)
```

#### Graphs

```
// Adjacency list

graph = defaultdict(list)
graph = {0 : [1,2], 1:[2], 2: []}

graph = [[0,1,1], [0,0,1], [0,0,0]]
```

#### Trie

```
class TrieNode:
    def __init__(self):
        self.children = []
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word:str) -> None: O(m), m words
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
```

#### Common Built-in functions

```
# Sorting
sorted(iterable)
reversed(iterable)

min(iterable)
max(iterable)

sum(iterable)

[x for x in range(10)] // create list from expression

s.split() // splits string into list
''.join(list) // join list elements into string

```
