type ObjectIterator<TObject, TResult> = (value: TObject[keyof TObject], key: string) => TResult;

export default function mapValues<T extends object, TResult>(
  obj: T,
  callback: ObjectIterator<T, TResult>,
): { [P in keyof T]: TResult } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, callback(value, key)]),
  ) as { [P in keyof T]: TResult };
}
