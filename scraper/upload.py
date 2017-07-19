from __future__ import print_function
import os
import boto3
from io import BytesIO
import gzip
import shutil


bucket = boto3.resource('s3').Bucket('austlii')


def upload(path='data/'):
    files = (
        os.path.join(path, node) for node in os.listdir(path)
        if os.path.isfile(os.path.join(path, node))
    )
    
    folders = (
        os.path.join(path, node) for node in os.listdir(path)
        if os.path.isdir(os.path.join(path, node))
    )

    for folder in folders:
        upload(folder)

    for filename in files:
        with open(filename, 'r') as f:
            print('uploading {}... '.format(filename), end='')
            f_compressed = BytesIO()
            with gzip.GzipFile(fileobj=f_compressed, mode='wb') as gz:
                shutil.copyfileobj(f, gz)
            f_compressed.seek(0)
            key = filename.replace('data/', '').replace('\\', '/')
            bucket.upload_fileobj(f_compressed, key, {
                'ContentType': 'application/json', 
                'ContentEncoding': 'gzip'
            })
            print('done')


if __name__ == '__main__':
    upload()