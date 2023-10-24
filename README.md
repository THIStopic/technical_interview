## All files must be renamed to 4x4.js, 5x5.js and 8x8.js since gmail doesn't allow to send js files and I had to rename them to txt files.
### They can easily be ran by renaming them back to js files and using node.js to run them from the command line. (node 4x4.js, node 5x5.js, node 8x8.js)

## Explanation of the approach taken (1 mark)

The approach uses a **recursive function** (backtracking algorithm). It **tries to place each puzzle piece into all possible positions** with **all posible rotations**, checking the validity of each before moving on to the next. **A set is used to keep track of already used pieces** to prevent duplicates. Additionally, **unique solutions are stored to avoid rotations of the same solution**.

## Lessons Learnt (0.25 marks)

I learned the **importance of checking if a solution is a rotation of an existing one** to reduce complexity and avoid duplicates. Also learned how valuable efficient use of data structures like sets can be to speed up the process.

## What Went Well (0.25 marks)

- **Piece rotation**: The rotatePiece() function worked well for obtaining all possible rotations of a piece.
- **Validity Checking**: The isValidPlacement() function proved effective for quickly checking if a piece can fit or not.

## Even Better If (0.25 marks)

- The code could be more efficient if **memoization techniques** are employed to store intermediate results. (I had to look for this term since I didn't know it beforehand)
- Could improve on unique solution handling to make it more efficient.

## How could you improve the algorithm in the future? (0.25 marks)

- The algorithm could be improved by using **memoization techniques** to store intermediate results, which would prevent repetitive calculations and speed up the algorithm. 
- **Multiple threads** could be used to speed up the process by running the algorithm on different parts of the puzzle simultaneously. (I also had to look for this term but I knew something like this existed)

## How long did you spend on this problem? (No marks)

I **spent about 6-8 hours** trying to solve this problem. That's taking into account **the whole process** of understanding the problem, coming up with a solution, implementing it, and testing it. I also spent some time researching about memoization and multithreading, but I didn't implement them.

## Are there any changes that you think we should make to these instructions or anything that we should take into consideration in the future? (No marks)

I think the instructions are **clear and concise**. I don't think there's anything that needs to be changed. I'd like to say I found it **very challenging**, I enjoyed working on it. I think it's a good problem to test the candidate's problem solving skills and knowledge of data structures and algorithms.