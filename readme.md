![](./hello.gif)

I've tried to keep the solution simple yet scalable. My main goal was to make addition of new years and modification of existing pricing data as easy and robust as possible. The requirements specify that it shouldn't be possible to apply two discounts for the same product but sample data doesn't contain any such scenario. I've coded it in anyway with `forServices` property on `IDiscount` interface that is later used to check this requirement. Now, technically I should make sure the the largest possible discount should be applied for the service and I can imagine scenarios that would break things with my implementation:

1. I rely on static data (collections of discounts) to be sorted from largest to smallest. This could be circumvented by `sort()`. I didn't want to complicate things, just want to mention I'm aware.
2. If discounts have gotten complicated and there would be multiple product packs reusing the same products, my solution would obviously break. In such scenarios we should consider all possible discount scenarios and choose the most beneficial one. That would complicate things and I don't think it was a part of the task, still thought I'd mention it.

I'd also like to mention that `updateSelectedServices` implementation could technically be achieved with some more abstraction of those various checks/rules. However, I think it's important to consider if such abstraction is worth the effort. Currently, I think not. If there were more cases to consider in the future, I'd refactor that part.§
